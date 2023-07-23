import express from 'express';
export namespace book {

    export interface item {
      id : number;
      title : string;
      author : string;
      publicationYear: number;
    }
    export interface Request extends express.Request{
      body :{
        id : number;
        title : string;
        author: string;
        publicationYear:number;
      }
      , query:{
        page : string,
        pageSize: string,
    }
      

    }
    export interface Response extends express.Response {
        send: (body: string | {
          page: number,
          pageSize: number,
          total: number,
          items: Array<item>   // Item[]
        }) => this
      }
    
}
export default book;