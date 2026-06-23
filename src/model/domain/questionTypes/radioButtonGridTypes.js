// src/model/domain/questionTypes/radioButtonGridTypes.js

/**
 * @typedef {Object} RadioButtonGridColumn
 * @property {string} id
 * @property {string} label
 * @property {number=} position
 */

/**
 * @typedef {Object} RadioButtonGridRow
 * @property {string} id
 * @property {string} text
 * @property {string=} correctColumnId
 * @property {number=} position
 */

/**
 * @typedef {Object} RadioButtonGridQuestion
 * @property {string|number} id
 * @property {"radioButtonGrid"} type
 * @property {string} title
 * @property {string} prompt
 * @property {number} points
 * @property {RadioButtonGridColumn[]} columns
 * @property {RadioButtonGridRow[]} rows
 */

/** @typedef {Record<string, string>} RadioButtonGridAnswer */
