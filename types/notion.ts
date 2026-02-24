import {
  PageObjectResponse,
  RichTextItemResponse,
  SelectPropertyItemObjectResponse,
} from '@notionhq/client';

export interface INotionPage extends Omit<PageObjectResponse, 'properties'> {
  properties: {
    게시일: {
      id: string;
      type: 'date';
      date: {
        start: string;
        end: string;
        time_zone: string | null;
      };
    };
    발행: {
      checkbox: boolean;
      id: string;
      type: 'checkbox';
    };
    제목: {
      id: string;
      type: 'title';
      title: RichTextItemResponse[];
    };
    카테고리: SelectPropertyItemObjectResponse;
  };
}

export interface INotionGallery extends Omit<PageObjectResponse, 'properties'> {
  properties: {
    생성일: {
      id: string;
      type: 'date';
      date: {
        start: string;
        end: string;
        time_zone: string | null;
      };
    };
    설명: {
      id: string;
      type: 'rich_text';
      rich_text: RichTextItemResponse[];
    };
    발행: {
      checkbox: boolean;
      id: string;
      type: 'checkbox';
    };
    이름: {
      id: string;
      type: 'title';
      title: RichTextItemResponse[];
    };
  };
}
