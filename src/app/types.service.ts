import { Injectable } from '@angular/core';
import { Language } from 'data/language';
import { Resource } from 'data/resource';

@Injectable()
export class TypesService {

    types = [{ id : 1, name : 'standard'}, { id : 2, name : 'custom'}, { id : 3, name : 'custom template'}];

    getTypes() {
        return this.types;
    }

}