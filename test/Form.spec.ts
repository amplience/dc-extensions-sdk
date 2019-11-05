import { FORM as ERRORS } from '../src/lib/Errors';
import { ClientConnection } from 'message.io';
import { Body } from '../src/lib/models/ContentItemModel';
import { Form } from '../src/lib/Form';

describe('Form', () => {
  let connection: ClientConnection;
  let form: Form;
  let onSpy;
  beforeEach(() => {
    connection = new ClientConnection();
    onSpy = spyOn(connection, 'on');
    form = new Form(connection, true);
  });

  describe('Form.constructor()', () => {
    it('should set up FORM.READ_ONLY event', () => {
      expect(connection.on).toHaveBeenCalled();
    });
  });
  describe('Form.onReadOnlyChange()', () => {
    it('should push callback to the onChangeStack, return an instance of the class and set readOnly value', () => {
      const cb = jasmine.createSpy();
      const $form = form.onReadOnlyChange(cb);
      const callOn = onSpy.calls.argsFor(0)[1];
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
      spyOn(connection, 'request').and.returnValue(Promise.resolve(formModel));
      const value = await form.getValue();
      expect(value).toBe(formModel);
    });
    it('should throw an error if the connection request fails', async () => {
      spyOn(connection, 'request').and.returnValue(Promise.reject());
      try {
        await form.getValue();
      } catch (e) {
        expect(e).toEqual(new Error(ERRORS.NO_MODEL));
      }
    });
  });
});
