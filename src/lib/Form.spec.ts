import { FORM as ERRORS } from './Errors';
import { ClientConnection } from 'message-event-channel';
import { Body } from './models/ContentItemModel';
import { Form } from './Form';

describe('Form', () => {
  let connection: ClientConnection;
  let form: Form;
  let onSpy : jest.SpyInstance;
  beforeEach(() => {
    connection = new ClientConnection();
    onSpy = jest.spyOn(connection, 'on');
    form = new Form(connection, true);
  });

  describe('Form.constructor()', () => {
    it('should set up FORM.READ_ONLY event', () => {
      expect(connection.on).toHaveBeenCalled();
    });
  });
  describe('Form.onReadOnlyChange()', () => {
    it('should push callback to the onChangeStack, return an instance of the class and set readOnly value', () => {
      const cb = jest.fn();
      const $form = form.onReadOnlyChange(cb);
      const callOn = onSpy.mock.calls[0][1];
      callOn(false);
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
          schema: 'http://test.test'
        },
        properties: {
          test: true
        }
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
});
