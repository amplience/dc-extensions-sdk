import { FIELD } from '../constants/Events';
import { Field, FieldSchema } from './Field';
import { ClientConnection } from 'message-event-channel';
import { ErrorReport } from '../models/ErrorReport';
import { Params } from '../models/Params';

const testValue = {
  hello: 'world',
};

const testError = ({
  message: 'wrong',
  pointer: '/here',
  data: {
    keyword: 'fail',
    params: {},
  },
  schema: {
    id: 'aschema',
    pointer: '/blah/blah',
  },
} as unknown) as ErrorReport;

describe('Field', () => {
  let connection: ClientConnection;
  let field: Field;
  const schema: FieldSchema<Params> = {
    title: 'My Field',
    type: 'string',
    'ui:extension': { url: '124' },
  };

  beforeAll(() => {
    connection = new ClientConnection();
    field = new Field(connection, schema);
  });

  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('set schema should be accessible', async () => {
    expect(field.schema).toEqual(schema);
  });

  it('getValue() should emit one request with the FIELD.MODEL_GET event and return the value from request', async () => {
    const p: Promise<object> = new Promise((resolve) => {
      resolve(testValue);
    });
    const requestSpy = jest.spyOn(connection, 'request').mockReturnValue(p);
    const fieldGet = await field.getValue();
    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(FIELD.MODEL_GET);
    expect(fieldGet).toEqual(testValue);
  });

  it('getValue() should return undefined value from request', async () => {
    jest.spyOn(connection, 'request').mockResolvedValue(undefined);
    const fieldGet = await field.getValue();
    expect(fieldGet).toEqual(undefined);
  });

  it('getValue() should return null value from request', async () => {
    jest.spyOn(connection, 'request').mockResolvedValue(null);
    const fieldGet = await field.getValue();
    expect(fieldGet).toEqual(null);
  });

  it('setValue(testValue) should should emit one request with the FIELD.MODEL_SET event with testValue', async () => {
    const requestSpy = jest.spyOn(connection, 'request');
    await expect(field.setValue(testValue)).resolves.toBeUndefined();
    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(FIELD.MODEL_SET, testValue);
  });

  it('setValue(null) should should emit FIELD.MODEL_SET event with null', async () => {
    const requestSpy = jest.spyOn(connection, 'request');
    await expect(field.setValue(null)).resolves.toBeUndefined();
    expect(requestSpy).toHaveBeenCalledWith(FIELD.MODEL_SET, null);
  });

  it('setValue() should should emit FIELD.MODEL_SET event with undefined value', async () => {
    const requestSpy = jest.spyOn(connection, 'request');
    await expect(field.setValue(undefined)).resolves.toBeUndefined();
    expect(requestSpy).toHaveBeenCalledWith(FIELD.MODEL_SET, undefined);
  });

  it('setValue(testValue) should not throw if no validation errors are returned', async () => {
    jest.spyOn(connection, 'request').mockResolvedValue([]);
    const fieldSet = await field.setValue(testValue);
    expect(fieldSet).toEqual(undefined);
  });

  it('setValue(testValue) should not throw if no validation undefined is returned', async () => {
    jest.spyOn(connection, 'request').mockResolvedValue(undefined);
    const fieldSet = await field.setValue(testValue);
    expect(fieldSet).toEqual(undefined);
  });

  it('setValue(testValue) should throw when validation errors are returned', async (done) => {
    jest.spyOn(connection, 'request').mockResolvedValue([testError]);
    try {
      await field.setValue(testValue);
    } catch (e) {
      expect(e).toEqual([testError]);
      done();
    }
  });

  describe('getPath()', () => {
    it('Should get the path', async () => {
      jest.spyOn(connection, 'request').mockResolvedValue('/path/t/0/field');
      const path = await field.getPath();

      expect(path).toEqual('/path/t/0/field');
    });
  });

  it('isValid(testValue) should emit one request with the FIELD.MODEL_IS_VALID event with testValue', async () => {
    const requestSpy = jest.spyOn(connection, 'request').mockResolvedValue(true);
    await field.isValid(testValue);
    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(FIELD.MODEL_IS_VALID, testValue);
  });

  it('isValid(testValue) should resolve a false boolean value', async () => {
    jest.spyOn(connection, 'request').mockResolvedValue(true);
    const valid = await field.isValid(testValue);
    expect(typeof valid === 'boolean').toBeTruthy();
    expect(valid).toEqual(true);
  });

  it('isValid(testValue) should resolve a true boolean value', async () => {
    jest.spyOn(connection, 'request').mockResolvedValue(false);
    const valid = await field.isValid(testValue);
    expect(typeof valid === 'boolean').toBeTruthy();
    expect(valid).toEqual(false);
  });

  it('validate(testValue) should emit one request with the FIELD.MODEL_VALIDATE event with testValue', async () => {
    const requestSpy = jest.spyOn(connection, 'request').mockResolvedValue([testError]);
    await field.validate(testValue);
    expect(requestSpy).toHaveBeenCalledTimes(1);
    expect(requestSpy).toHaveBeenCalledWith(FIELD.MODEL_VALIDATE, testValue);
  });

  it('validate(testValue) should return nothing if it resolved with []', async () => {
    jest.spyOn(connection, 'request').mockResolvedValue([]);
    const errors = await field.validate(testValue);
    expect(errors).toEqual(undefined);
  });

  it('validate(testValue) should return nothing if it resolved with nothing', async () => {
    jest.spyOn(connection, 'request').mockResolvedValue(undefined);
    const errors = await field.validate(testValue);
    expect(errors).toEqual(undefined);
  });

  it('validate(testValue) should be able to return errors', async () => {
    jest.spyOn(connection, 'request').mockResolvedValue([testError]);
    const errors = await field.validate(testValue);
    expect(errors).toEqual([testError]);
  });

  it('should be able to reset model to original value', async () => {
    jest.spyOn(connection, 'request').mockResolvedValue({});
    await expect(field.reset()).resolves.toEqual({});
    expect(connection.request).toHaveBeenCalledWith(FIELD.MODEL_RESET);
  });
});
