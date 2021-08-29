//Contain all methods that convert, transform or create news datas from existing ones

import TranslationFunctionalities from "./DatasCalculator/TranslationFunctionalities.js";
import DatasListFunctionalities from "./DatasCalculator/DatasListFunctionalities.js";
import NumberFunctionalities from "./DatasCalculator/NumberFunctionalities.js";
import DateFunctionalities from "./DatasCalculator/DateFunctionalities.js";
import ArrayFunctionalities from "./DatasCalculator/ArrayFunctionalities.js";
import TextFunctionalities from "./DatasCalculator/TextFunctionalities.js";

export default class DatasCalculator {}

Object.assign(DatasCalculator.prototype, TranslationFunctionalities);
Object.assign(DatasCalculator.prototype, DatasListFunctionalities);
Object.assign(DatasCalculator.prototype, NumberFunctionalities);
Object.assign(DatasCalculator.prototype, DateFunctionalities);
Object.assign(DatasCalculator.prototype, ArrayFunctionalities);
Object.assign(DatasCalculator.prototype, TextFunctionalities);