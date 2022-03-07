import CompInput from "components/reusable/_input";

const form_items__arr = [
  {
    key: "sign_in_id",
    label: "아이디",
  },
  {
    key: "sign_in_pw",
    label: "비밀번호",
  },
];

export default function CompSignIn() {
  return (
    <div className="comp sign_in box">
      <div className="inner">
        <form onSubmit={(e) => {}}>
          <fieldset className="form-inner">
            <legend>{"sign in"}</legend>
            <div className="warn form-group">
              {true ? (
                <>
                  <div className="icon-box">
                    <i className={`icon ${1}`}></i>
                  </div>
                  <div className="content-box">
                    <span>{"로그인 실패"}</span>
                  </div>
                </>
              ) : undefined}
            </div>
            <>
              {form_items__arr.map((form_item__obj) => {
                const { key, label } = form_item__obj;
                return (
                  <div key={key} className={`${label} form-group`}>
                    <label htmlFor={key}>{label}</label>
                    <CompInput type={"text"} id={key} name={key} placeholder={label} onChange={(e) => {}} />
                  </div>
                );
              })}
            </>
            <div className="btn-wrap form-group">
              <button type="submit">{"로그인"}</button>
            </div>
          </fieldset>
        </form>
      </div>
    </div>
  );
}
