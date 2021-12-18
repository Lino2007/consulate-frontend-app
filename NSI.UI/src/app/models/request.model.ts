export class FullRequest {
    request: ShortReq;
    document?: (Document)[] | null;
    attachment?: (Attachment)[] | null;
  }

  export class ShortReq {
    id: string;
    user: string;
    employee: string;
    dateCreated: string;
    reason: string;
    type: string;
    state: string;
  }
  
  export class Document {
    dateCreated: string;
    dateOfExpiration: string;
    url: string;
    active: boolean;
    title: string;
    documentType: string;
  }

  export class Attachment {
    id: string;
    url: string;
    documentType: string;
  }
  