const dummy__arr_usr__doc_list = [
  {
    alt: "ok1",
    str_doc_name: "A",
  },
  {
    alt: "ok2",
    str_doc_name: "B",
  },
  {
    alt: "ok3",
    str_doc_name: "C",
  },
];

const dummy__arr_usr_doc__elem_list = [
  {
    selector: "markdown",
    value: `
    # GFM
    
    ## Autolink literals
    
    www.example.com, https://example.com, and contact@example.com.
    
    ## Footnote
    
    A note[^1]
    
    [^1]: Big note.
    
    ## Strikethrough
    
    ~one~ or ~~two~~ tildes.
    
    ## Table
    
    | a | b  |  c |  d  |
    | - | :- | -: | :-: |
    
    ## Tasklist
    
    * [ ] to do
    * [x] done
    `,
  },
  {
    selector: "markdown",
    value: "# OK\n## PLLL",
  },
  {
    selector: "palette",
    value: `#000\r\n#fcfcfc #fd7891\t#fa6109\n#dfdfdf\t#adadad #d7d #d99 #d99 #111 sssss 101010`,
  },
];

exports.dummy__arr_usr__doc_list = dummy__arr_usr__doc_list;
exports.dummy__arr_usr_doc__elem_list = dummy__arr_usr_doc__elem_list;
