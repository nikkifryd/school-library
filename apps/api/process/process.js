import * as http from 'node:http';

import * as database from "./query.js";
import * as talk from "../talk/talk.js";

/**
 * GET /api/books
 * Gets all existing books
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
export async function getAllBooks(req,res) {
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
export async function getBook(id,req,res) {
    let result = await database.getBook(id);
    talk.sendResult(result, res);
}

/**
 * GET /api/books/$id/lending
 * Gets the current transaction of the book with the id
 * @param {number} id key of the book
 * @param {http.IncomingMessage} req 
 * @param {http.ServerResponse} res 
 */
export async function getBookCurrentTransaction(id,req,res) {
    let result = await database.getBookCurrentTransaction(id);
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
export async function getBookTransactions(id,req,res) {
    let result = await database.getBookTransactions(id);
    talk.sendResult(result, res);
}