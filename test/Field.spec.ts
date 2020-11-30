import { FIELD } from '../src/lib/Events';
import { Field, FieldSchema } from '../src/lib/Field';
import { ClientConnection } from 'message-event-channel';
import { ErrorReport } from '../src/lib/models/ErrorReport';
import { Params } from '../src/lib/models/Params';

const testValue = {
  hello: 'world'
};

const testError: ErrorReport = {
  message: 'wrong',
  pointer: '/here',
  data: {
    keyword: 'fail',
    params: null
  },
  schema: {
    id: 'aschema',
    pointer: '/blah/blah'
  }
};

describe('Field', () => {
  let connection: ClientConnection;
  let schema: FieldSchema<Params>;
  let field: Field;

  beforeAll(() => {
    connection = new ClientConnection();
    schema = {
      title: 'My Field',
      type: 'string',
      'ui:extension': { url: '124' }
    };
    field = new Field(connection, schema);
  });

  it('set schema should be accessible', async () => {
    expect(field.schema).toEqual(schema);
  });

  it('getValue() should emit one request with the FIELD.MODEL_GET event and return the value from request', async () => {
    const p: Promise<object> = new Promise(resolve => {
      resolve(testValue);
    });
    const requestSpy = spyOn(connection, 'request').and.returnValue(p);
    const fieldGet = await field.getValue();
    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(FIELD.MODEL_GET);
    expect(fieldGet).toEqual(testValue);
  });

  it('getValue() should return undefined value from request', async () => {
    const p: Promise<object> = new Promise(resolve => {
      resolve(undefined);
    });
    spyOn(connection, 'request').and.returnValue(p);
    const fieldGet = await field.getValue();
    expect(fieldGet).toEqual(undefined);
  });

  it('getValue() should return null value from request', async () => {
    const p: Promise<object> = new Promise(resolve => {
      resolve(null);
    });
    spyOn(connection, 'request').and.returnValue(p);
    const fieldGet = await field.getValue();
    expect(fieldGet).toEqual(null);
  });

  it('setValue(testValue) should should emit one request with the FIELD.MODEL_SET event with testValue', async () => {
    const requestSpy = spyOn(connection, 'request');
    field
      .setValue(testValue)
      .then()
      .catch();
    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(FIELD.MODEL_SET, testValue);
  });

  it('setValue(null) should should emit FIELD.MODEL_SET event with null', async () => {
    const requestSpy = spyOn(connection, 'request');
    field
      .setValue(null)
      .then()
      .catch();
    expect(requestSpy).toHaveBeenCalledWith(FIELD.MODEL_SET, null);
  });

  it('setValue() should should emit FIELD.MODEL_SET event with undefined value', async () => {
    const requestSpy = spyOn(connection, 'request');
    field
      .setValue()
      .then()
      .catch();
    expect(requestSpy).toHaveBeenCalledWith(FIELD.MODEL_SET, undefined);
  });

  it('setValue(testValue) should not throw if no validation errors are returned', async () => {
    const p: Promise<any> = new Promise(resolve => {
      resolve([]);
    });
    spyOn(connection, 'request').and.returnValue(p);
    const fieldSet = await field.setValue(testValue);
    expect(fieldSet).toEqual(undefined);
  });

  it('setValue(testValue) should not throw if no validation undefined is returned', async () => {
    const p: Promise<any> = new Promise(resolve => {
      resolve(undefined);
    });
    spyOn(connection, 'request').and.returnValue(p);
    const fieldSet = await field.setValue(testValue);
    expect(fieldSet).toEqual(undefined);
  });

  it('setValue(testValue) should throw when validation errors are returned', async done => {
    const p: Promise<any> = new Promise(resolve => {
      resolve([testError]);
    });
    spyOn(connection, 'request').and.returnValue(p);
    try {
      await field.setValue(testValue);
    } catch (e) {
      expect(e).toEqual([testError]);
      done();
    }
  });

  it('isValid(testValue) should emit one request with the FIELD.MODEL_IS_VALID event with testValue', async () => {
    const p: Promise<any> = new Promise(resolve => {
      resolve(true);
    });
    const requestSpy = spyOn(connection, 'request').and.returnValue(p);
    await field.isValid(testValue);
    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(FIELD.MODEL_IS_VALID, testValue);
  });

  it('isValid(testValue) should resolve a false boolean value', async () => {
    const p: Promise<any> = new Promise(resolve => {
      resolve(true);
    });
    spyOn(connection, 'request').and.returnValue(p);
    const valid = await field.isValid(testValue);
    expect(typeof valid === 'boolean').toBeTruthy();
    expect(valid).toEqual(true);
  });

  it('isValid(testValue) should resolve a true boolean value', async () => {
    const p: Promise<any> = new Promise(resolve => {
      resolve(false);
    });
    spyOn(connection, 'request').and.returnValue(p);
    const valid = await field.isValid(testValue);
    expect(typeof valid === 'boolean').toBeTruthy();
    expect(valid).toEqual(false);
  });

  it('validate(testValue) should emit one request with the FIELD.MODEL_VALIDATE event with testValue', async () => {
    const p: Promise<any> = new Promise(resolve => {
      resolve([testError]);
    });
    const requestSpy = spyOn(connection, 'request').and.returnValue(p);
    await field.validate(testValue);
    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(FIELD.MODEL_VALIDATE, testValue);
  });

  it('validate(testValue) should return nothing if it resolved with []', async () => {
    const p: Promise<any> = new Promise(resolve => {
      resolve([]);
    });
    spyOn(connection, 'request').and.returnValue(p);
    const errors = await field.validate(testValue);
    expect(errors).toEqual(undefined);
  });

  it('validate(testValue) should return nothing if it resolved with nothing', async () => {
    const p: Promise<any> = new Promise(resolve => {
      resolve(undefined);
    });
    spyOn(connection, 'request').and.returnValue(p);
    const errors = await field.validate(testValue);
    expect(errors).toEqual(undefined);
  });

  it('validate(testValue) should be able to return errors', async () => {
    const p: Promise<any> = new Promise(resolve => {
      resolve([testError]);
    });
    spyOn(connection, 'request').and.returnValue(p);
    const errors = await field.validate(testValue);
    expect(errors).toEqual([testError]);
  });

  it('should be able to reset model to original value', () => {
    spyOn(connection, 'request').and.callThrough();
    field
      .reset()
      .then()
      .catch();
    expect(connection.request).toHaveBeenCalledWith(FIELD.MODEL_RESET);
  });
});
