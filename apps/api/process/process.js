import * as http from 'node:http';

import { ApiError } from '../talk/apiError.js';
import * as database from "./query.js";
import * as talk from "../talk/talk.js";

/**
 * GET /api/books
 * Gets all existing books
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
export async function getAllBooks(params,req,res) {
    let result = await database.getAllBooks();
    talk.sendResult(result, res);
}

/**
 * GET /api/books/$id
 * Gets the book with the id
 * @param {number} id key of the book
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
export async function getBook(params,req,res) {
    let id = params.id;
    let result;

    if(!Number(id) && id !=='0')
        throw new ApiError(404,"Book not found");
    
    result = await database.getBook(id);
    
    if(result.length === 0)
        talk.sendResult(result, res, 404);
    else
        talk.sendResult(result, res);
} 

/**
 * GET /api/books/$id/lending
 * Gets the current transaction of the book with the id
 * @param {number} id key of the book
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
export async function getBookCurrentTransaction(params,req,res) {
    let id = params.id;
    let result;

    if(!Number(id) && id !=='0')
        throw new ApiError(404,"Book not found");
    
    let book = await database.getBook(id);

    if (book.length===0)
        throw new ApiError(404,"Book (id: "+id+") not found");

    result = await database.getBookCurrentTransaction(id);

    talk.sendResult(result, res);
}

/**
 * GET /api/books/$id/lending/log
 * Gets the logged history of all transactions 
 * ever issued for the given book
 * @param {number} id key of the book
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
export async function getBookTransactions(params,req,res) {
    let id = params.id;
    let result;
    
    if(!Number(id) && id !=='0')
        throw new ApiError(404,"Book not found");
    
    let book = await database.getBook(id);
    
    if (book.length===0)
        throw new ApiError(404,"Book (id: "+id+") not found") ;

    result = await database.getBookTransactions(id);
    console.log(result);
    
    talk.sendResult(result, res);
}