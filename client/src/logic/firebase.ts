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
  // orderBy,
  // limit,
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
  // OrderByDirection,
} from "firebase/firestore";
import type { T_AsyncFunc } from "@/models/function";
import type { I_map } from "@/models/reusables";

const fn_handle__success__ctx = (msg?: string) => {
  console.log(msg);
};

const fn_handle__error__ctx = (err: Error, msg?: string) => {
  const ERR_MSG = msg;
  console.error(`${ERR_MSG}\n${err}`);
};

// WRAPPER
export const fn_wrap__run_transaction = async (_db: Firestore, _cb: T_AsyncFunc) => {
  return await runTransaction(_db, _cb).catch((err) => fn_handle__error__ctx(err, "FB - TRANSACTION"));
};

export const fn_wrap__write_batch = async (_db: Firestore, _cb: T_AsyncFunc) => {
  const batch = writeBatch(_db);
  await _cb(batch).catch((err) => fn_handle__error__ctx(err, "FB - WRITE BATCH"));
  await batch.commit();
};

// GETTER
export const fn_get__fb__collection_ref = <T = DocumentData>(_db: Firestore, _path: string) => {
  return collection(_db, _path) as CollectionReference<T>;
};

export const fn_get__fb__collection_group_ref = <T = DocumentData>(_db: Firestore, _collection_id: string) => {
  return collectionGroup(_db, _collection_id) as Query<T>;
};

export const fn_get__fb__document_ref = <T = DocumentData>(_db: Firestore, _path: string) => {
  return doc(_db, _path) as DocumentReference<T>;
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
  _query_constraints?: QueryConstraint[]
): Promise<any[]> => {
  let q;
  let results__arr: any[] = [];
  if (_query_constraints) {
    q = query(_collection_ref, ..._query_constraints);
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
// _collection_ref: DB, 컬렉션ID
export const fn_POST__fb__add_doc = async (_collection_ref: CollectionReference, _doc_data: I_map) => {
  const MSG = "FB - ADD DOCUMENT";

  await addDoc(_collection_ref, _doc_data)
    .then(() => fn_handle__success__ctx(MSG))
    .catch((err) => fn_handle__error__ctx(err, MSG));
};

// -- 단일 문서 생성2 (문서 ID 자동 생성)
export const fn_POST__fb__mix_set_doc = async (_collection_ref: CollectionReference, _doc_data: I_map, _options?: I_map) => {
  const MSG = "FB - MIX SET DOCUMENT";

  const _doc_ref = doc(_collection_ref);
  await setDoc(_doc_ref, _doc_data)
    .then(() => fn_handle__success__ctx(MSG))
    .catch((err) => fn_handle__error__ctx(err, MSG));
};

// POST & PUT
// -- 단일 문서 생성3 (문서에 유의미한 ID 지정)
// -- _doc_ref: DB, 컬렉션ID/문서ID
// -- _options: { merge: true } --> 덮어쓰기
export const fn_POST__fb__set_doc = async (_doc_ref: DocumentReference, _doc_data: I_map, _options?: SetOptions) => {
  const MSG = "FB - SET DOCUMENT";
  
  await setDoc(_doc_ref, _doc_data)
    .then(() => fn_handle__success__ctx(MSG))
    .catch((err) => fn_handle__error__ctx(err, MSG));
};

// PATCH
// 문서의 일부 필드 변경
// 타임스탬프: serverTimestamp()
// 중첩된 객체: 키에서 점 표기법 ex) "key.prop": value
// 배열에 없는 요소 추가: arrayUnion(value)
// 제공된 각 요소의 모든 인스턴스를 삭제: arrayRemove(value)
// 숫자 증분: increment(number)
// 필드 삭제: deleteField()
export const fn_PATCH__fb__update_doc = async (_doc_ref: DocumentReference, _doc_data: I_map) => {
  await updateDoc(_doc_ref, _doc_data).catch((err) => fn_handle__error__ctx(err, "FB - UPDATE DOCUMENT"));
};

// DELETE
// -- 문서 삭제
export const fn_DELETE__fb__doc = async <T = DocumentData>(_doc_ref: DocumentReference<T>): Promise<void> => {
  await deleteDoc(_doc_ref).catch((err) => fn_handle__error__ctx(err, "FB - DELETE DOCUMENT"));
};

// -- 문서의 필드 삭제
export const fn_DELETE__fb__field = async (_doc_ref: DocumentReference, _doc_props: string | string[] | I_map) => {
  let doc_data;

  if (typeof _doc_props === "string") {
    doc_data = {
      [_doc_props]: deleteField(),
    };
  } else if (_doc_props instanceof Array) {
    doc_data = _doc_props.reduce((obj: I_map, prop) => {
      obj[prop] = deleteField();
      return obj;
    }, {});
  } else {
    doc_data = Object.keys(_doc_props).reduce((obj: I_map, prop) => {
      obj[prop] = deleteField();
      return obj;
    }, {});
  }

  return updateDoc(_doc_ref, doc_data).catch((err) => fn_handle__error__ctx(err, "FB - UPDATE DOC FIELD"));
};
