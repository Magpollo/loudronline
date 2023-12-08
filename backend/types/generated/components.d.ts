import type { Schema, Attribute } from '@strapi/strapi';

export interface ReusableCategory extends Schema.Component {
  collectionName: 'components_reusable_categories';
  info: {
    displayName: 'Category';
  };
  attributes: {
    name: Attribute.String;
    description: Attribute.Text;
    categoryId: Attribute.UID &
      Attribute.CustomField<'plugin::field-uuid.uuid'>;
  };
}

declare module '@strapi/types' {
  export module Shared {
    export interface Components {
      'reusable.category': ReusableCategory;
    }
  }
}
