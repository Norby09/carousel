import { Injectable } from '@angular/core';

@Injectable()
export class TypesService {

    /**
    * Configuration object for the type area
    * @name    types
    * @type    {object[]}
    * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
    * @added    2018-08-08
    */
    private types = [{ id : 1, name : 'standard'}, { id : 2, name : 'custom'}, { id : 3, name : 'custom template'}];

    /**
    * Returns the configuration object for the type field
    * @method   getTypes
    * @author   Orsolya Racz <Orsolya.Racz@blackline.com>
    * @added    2018-08-08
    * @returns    {object[]}  
    * @example    <caption>Basic Usage</caption>
    * this.getTypes();
    */
    public getTypes() : object[] {
        return this.types;
    }

}