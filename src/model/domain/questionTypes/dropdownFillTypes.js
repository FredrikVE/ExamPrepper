// src/model/domain/questionTypes/dropdownFillTypes.js

/**
 * @typedef {Object} DropdownFillOption
 * @property {string} id
 * @property {string} label
 * @property {number=} position
 */

/**
 * @typedef {Object} DropdownFillItem
 * @property {string} id
 * @property {string=} groupLabel
 * @property {string} beforeText
 * @property {string} afterText
 * @property {string=} ariaLabel
 * @property {string=} correctOptionId
 * @property {number=} position
 */

/**
 * @typedef {Object} DropdownFillQuestion
 * @property {string|number} id
 * @property {"dropdownFill"} type
 * @property {string} title
 * @property {string} prompt
 * @property {number} points
 * @property {DropdownFillOption[]} options
 * @property {DropdownFillItem[]} items
 */

/** @typedef {Record<string, string>} DropdownFillAnswer */
