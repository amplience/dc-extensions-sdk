import { FORM as ERRORS } from '../constants/Errors';
import { ClientConnection } from 'message-event-channel';
import { Body } from '../models/ContentItemModel';
import { Form } from './Form';
import { FORM } from '../constants/Events';

describe('Form', () => {
  let connection: ClientConnection;
  let form: Form;
  let callbacks: Record<string, Function> = {};

  beforeEach(() => {
    connection = new ClientConnection();
    jest.spyOn(connection, 'on').mockImplementation((e, cb) => {
      callbacks[e] = cb;
      return connection;
    });
    form = new Form(connection, true);
  });

  describe('Form.constructor()', () => {
    it('should set up FORM events', () => {
      expect(connection.on).toHaveBeenCalledWith(FORM.READ_ONLY, expect.any(Function));
      expect(connection.on).toHaveBeenCalledWith(FORM.FORM_VALUE_CHANGE, expect.any(Function));
    });
  });
  describe('Form.onReadOnlyChange()', () => {
    it('should push callback to the onChangeStack, return an instance of the class and set readOnly value', () => {
      const cb = jest.fn();
      const $form = form.onReadOnlyChange(cb);

      callbacks[FORM.READ_ONLY](false);

      expect($form).toBe(form);
      expect(cb).toHaveBeenCalledWith(false);
      expect(form.readOnly).toEqual(false);
    });
  });
  describe('Form.getValue()', () => {
    it('should get the value of the form', async () => {
      const formModel: Body = {
        _meta: {
          name: 'test',
          schema: 'http://test.test',
        },
        properties: {
          test: true,
        },
      };
      jest.spyOn(connection, 'request').mockReturnValue(Promise.resolve(formModel));
      const value = await form.getValue();
      expect(value).toBe(formModel);
    });
    it('should throw an error if the connection request fails', async () => {
      jest.spyOn(connection, 'request').mockReturnValue(Promise.reject());
      try {
        await form.getValue();
      } catch (e) {
        expect(e).toEqual(new Error(ERRORS.NO_MODEL));
      }
    });
  });

  describe('Form.onFormValueChange()', () => {
    it('should push callback to the onChangeStack and return an instance of the class', () => {
      const cb = jest.fn();
      const $form = form.onFormValueChange(cb);
      callbacks[FORM.FORM_VALUE_CHANGE]({ test: 'hello' });

      expect($form).toBe(form);
      expect(cb).toHaveBeenCalledWith({ test: 'hello' });
    });
  });
});
