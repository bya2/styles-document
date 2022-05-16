export interface I_doc_item_ref {
  [key: string]: any;
  id: string;
  name: string;
}

export interface I_doc_item extends I_doc_item_ref {}

export interface I_doc_img_item extends I_doc_item_ref {
  img: string | HTMLImageElement | SVGImageElement | File;
}

export interface I_doc__elem {
  uid: string;
  doc_uid: string;
  title: string;
  content?: string; // TEXT
  volume?: number;
}
