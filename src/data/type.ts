import { stringOrDefault, objectOrDefault, arrayOrDefault, numberOrDefault } from 'utils/value-or-default';

export class Type {
  /**
  * Property of type with a default value of 1 that shouldnt change
  * @name    standard
  * @type    {number}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  standard: number = 1;
  /**
  * Property of Type, being a number, by default 2 and this should not be changed
  * @name    custom
  * @type    {number}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  custom: number = 2;
  /**
  * Property of Type class of type number having a default value of 3, this should not be changed
  * @name    customTemplate
  * @type    {number}
  * @author    Norbert Layis <Norbert.Layis@blackline.com>
  * @added    8/8/2018
  */
  customTemplate: number = 3;

  /**
   * Static method used to create a new instance of Type
   * @method   create
   * @author    Norbert Layis <Norbert.Layis@blackline.com>
   * @added    8/8/2018
   * @returns    {Type} Returns a Type instance whether we have a config object or not
   * @example    <caption>Basic Usage</caption>
   * this.create();
   */
  static create(config?: any) {
    if (!config) {
      return new Type({});
    }
    return new Type(config);
  }

  /**
  * Constructor, no necessary implementation done here
  * @author		Norbert Layis <Norbert.Layis@blackline.com>
  * @added		8/8/2018
  * @memberOf	type
  * @example		<caption>Basic Usage</caption>
  */
  constructor(config?: any) {
  }
}
