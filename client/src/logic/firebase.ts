import {
  collection,
  addDoc,
  setDoc,
  updateDoc,
  runTransaction,
  getDoc,
  getDocs,
  deleteDoc,
  doc,
  SetOptions,
  deleteField,
  writeBatch,
  getDocFromCache,
  query,
  where,
  collectionGroup,
  orderBy,
  limit,
} from "firebase/firestore";
import type {
  Firestore,
  CollectionReference,
  DocumentReference,
  DocumentData,
  FieldPath,
  WhereFilterOp,
  Query,
  QueryConstraint,
  OrderByDirection,
} from "firebase/firestore";
import type { AsyncFunc } from "@/models/Function";
import type { obj } from "@/models/reusables";

const fn_handle__error__ctx = (err: Error, msg?: string) => {
  const ERR_MSG = msg;
  console.error(`${ERR_MSG}\n${err}`);
};

// WRAPPER
export const fn_wrap__run_transaction = async (_db: Firestore, _cb: AsyncFunc) => {
  await runTransaction(_db, _cb).catch((err) => fn_handle__error__ctx(err, "FB - TRANSACTION"));
};

export const fn_wrap__write_batch = async (_db: Firestore, _cb: AsyncFunc) => {
  const batch = writeBatch(_db);
  await _cb(batch).catch((err) => fn_handle__error__ctx(err, "FB - WRITE BATCH"));
  await batch.commit();
};

// GETTER
export const fn_get__fb__collection_ref = (_db: Firestore, _path: string) => {
  return collection(_db, _path);
};

export const fn_get__fb__collection_group_ref = (_db: Firestore, _collection_id: string) => {
  return collectionGroup(_db, _collection_id);
};

export const fn_get__fb__document_ref = (_db: Firestore, _path: string) => {
  return doc(_db, _path);
};

// GET
export const fn_GET__fb__doc = async <T = DocumentData>(_doc_ref: DocumentReference<T>) => {
  const doc_snap = await getDoc(_doc_ref);

  if (doc_snap.exists()) {
    return doc_snap.data();
  } else {
    console.log("No such document!");
  }
};

export const fn_GET__fb__cache_doc = async <T = DocumentData>(_doc_ref: DocumentReference<T>) => {
  const doc = await getDocFromCache(_doc_ref);

  if (doc.exists()) {
    return doc.data();
  } else {
    console.log("No such document!");
  }
};

export const fn_GET__fb__collection_docs = async <T = DocumentData>(
  _collection_ref: CollectionReference<T>,
  _conditions?: [string | FieldPath, WhereFilterOp, any][],
  _orders?: [string | FieldPath, OrderByDirection | undefined],
  _limit?: number
): Promise<any[]> => {
  let q;
  let results__arr: any[] = [];
  if (_conditions || _orders || _limit) {
    let constraints__arr: QueryConstraint[] = [];

    if (_conditions) {
      for (const condition of _conditions) {
        constraints__arr = [...constraints__arr, where(...condition)];
      }
    }

    if (_orders) {
      constraints__arr = [...constraints__arr, orderBy(..._orders)];
    }

    if (_limit) {
      constraints__arr = [...constraints__arr, limit(_limit)];
    }

    q = query(_collection_ref, ...constraints__arr);
  } else {
    q = query(_collection_ref);
  }

  const query_snapshot = await getDocs(q);
  query_snapshot.forEach((doc) => {
    results__arr = [...results__arr, doc.data()];
  });

  return results__arr;
};

// 컬렉션 이름이 같은 것이 컬렉션 그룹
export const fn_GET__fb__collection_group_docs = async <T = DocumentData>(
  _collection_group_ref: Query<T>,
  _condition?: [string | FieldPath, WhereFilterOp, any]
): Promise<any[]> => {
  let q;
  let results__arr: any = [];

  if (_condition) {
    q = query(_collection_group_ref, where(..._condition));
  } else {
    q = query(_collection_group_ref);
  }

  const query_snapshot = await getDocs(q);
  query_snapshot.forEach((doc) => {
    results__arr = [...results__arr, doc.data()];
  });

  return results__arr;
};

// POST
// -- 단일 문서 생성1 (문서 ID 자동 생성)
export const fn_POST__fb__add_doc = async (_collection_ref: CollectionReference, _doc_data: obj) => {
  // _collection_ref: DB, 컬렉션ID
  await addDoc(_collection_ref, _doc_data).catch((err) => fn_handle__error__ctx(err, "FB - ADD DOCUMENT"));
};

// -- 단일 문서 생성2 (문서 ID 자동 생성)
export const fn_POST__fb__mix_set_doc = async (_collection_ref: CollectionReference, _doc_data: obj, _options?: obj) => {
  const _doc_ref = doc(_collection_ref);
  await setDoc(_doc_ref, _doc_data).catch((err) => fn_handle__error__ctx(err, "FB - MIX SET DOCUMENT"));
};

// POST & PUT
// -- 단일 문서 생성3 (문서에 유의미한 ID 지정)
// -- _doc_ref: DB, 컬렉션ID/문서ID
// -- _options: { merge: true } --> 덮어쓰기
export const fn_POST__fb__set_doc = async (_doc_ref: DocumentReference, _doc_data: obj, _options?: SetOptions) => {
  await setDoc(_doc_ref, _doc_data).catch((err) => fn_handle__error__ctx(err, "FB - SET DOCUMENT"));
};

// PATCH
// 문서의 일부 필드 변경
// 타임스탬프: serverTimestamp()
// 중첩된 객체: 키에서 점 표기법 ex) "key.prop": value
// 배열에 없는 요소 추가: arrayUnion(value)
// 제공된 각 요소의 모든 인스턴스를 삭제: arrayRemove(value)
// 숫자 증분: increment(number)
// 필드 삭제: deleteField()
export const fn_PATCH__fb__update_doc = async (_doc_ref: DocumentReference, _doc_data: obj) => {
  await updateDoc(_doc_ref, _doc_data).catch((err) => fn_handle__error__ctx(err, "FB - UPDATE DOCUMENT"));
};

// DELETE
// -- 문서 삭제
export const fn_DELETE__fb__doc = async <T = DocumentData>(_doc_ref: DocumentReference<T>): Promise<void> => {
  await deleteDoc(_doc_ref).catch((err) => fn_handle__error__ctx(err, "FB - DELETE DOCUMENT"));
};

// -- 문서의 필드 삭제
export const fn_DELETE__fb__field = async (_doc_ref: DocumentReference, _doc_props: string | string[] | obj) => {
  let doc_data;

  if (typeof _doc_props === "string") {
    doc_data = {
      [_doc_props]: deleteField(),
    };
  } else if (_doc_props instanceof Array) {
    doc_data = _doc_props.reduce((obj: obj, prop) => {
      obj[prop] = deleteField();
      return obj;
    }, {});
  } else {
    doc_data = Object.keys(_doc_props).reduce((obj: obj, prop) => {
      obj[prop] = deleteField();
      return obj;
    }, {});
  }

  return updateDoc(_doc_ref, doc_data).catch((err) => fn_handle__error__ctx(err, "FB - UPDATE DOC FIELD"));
};
