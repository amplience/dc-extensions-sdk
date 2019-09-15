import { FIELD } from '../src/Events';
import { Field, FieldSchema } from '../src/Field';
import { ClientConnection } from 'message.io';
import { ErrorReport } from '../src/models/ErrorReport';

var testValue = {
  hello: 'world'
};

var testError: ErrorReport = {
  message: "wrong",
  pointer: "/here",
  data: {
    keyword: "fail",
    params: null
  },
  schema: {
    id: "aschema",
    pointer: "/blah/blah"
  }
};

describe('Field', () => {
  var connection: ClientConnection, schema: FieldSchema, field: Field;

  beforeAll(() => {
    connection = new ClientConnection();
    schema = {
      title: 'My Field',
      type: 'string'
    };
    field = new Field(connection, schema);
  });

  it('getValue should return a value', async () => {
    const p: Promise<object> = new Promise(resolve => {
      resolve(testValue);
    });
    const requestSpy = spyOn(connection, 'request').and.returnValue(p);
    const fieldGet = await field.getValue();
    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(FIELD.MODEL_GET);
    expect(fieldGet).toEqual(testValue);
  });

  it('setValue should send value and return null if there are no errors returned', async () => {
    const p: Promise<any> = new Promise(resolve => {
      resolve([]);
    });
    const requestSpy = spyOn(connection, 'request').and.returnValue(p);
    const fieldSet = await field.setValue(testValue);
    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(FIELD.MODEL_SET, testValue);
    expect(fieldSet).toEqual(undefined);
  });

  it('setValue should promise should reject and return errors', async () => {
    const p: Promise<any> = new Promise(resolve => {
      resolve([testError]);
    });
    const requestSpy = spyOn(connection, 'request').and.returnValue(p);
    try{
      await field.setValue(testValue);
    } catch (e) {
      expect(requestSpy).toHaveBeenCalledTimes(1);
      expect(requestSpy).toHaveBeenCalledWith(FIELD.MODEL_SET, testValue);
      expect(e[0]).toEqual(testError);
    }

  });

  it('isValid should return a boolean', async () => {
    const p: Promise<any> = new Promise(resolve => {
      resolve(true);
    });
    const requestSpy = spyOn(connection, 'request').and.returnValue(p);
    const fieldSet = await field.isValid(testValue);
    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(FIELD.MODEL_IS_VALID, testValue);
    expect(fieldSet).toEqual(true);
  });

  it('validate should be able to return errors', async () => {
    const p: Promise<any> = new Promise(resolve => {
      resolve([testError]);
    });
    const requestSpy = spyOn(connection, 'request').and.returnValue(p);
    const errors = await field.validate(testValue);
    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(FIELD.MODEL_VALIDATE, testValue);
    expect(errors[0]).toEqual(testError);
  });
});
