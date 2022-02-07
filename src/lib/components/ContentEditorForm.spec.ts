import { ClientConnection } from 'message-event-channel';
import { ContentEditorForm } from './ContentEditorForm';
import { CONTENT_EDITOR_FORM, FORM } from '../constants/Events';
import { FORM as ERRORS } from '../constants/Errors';
import { request } from 'http';
import { ErrorReport } from '../models/ErrorReport';

describe('ContentEditorForm', () => {
  let form: ContentEditorForm;
  let onSpy: jest.SpyInstance;
  let connection: ClientConnection;

  beforeEach(() => {
    connection = new ClientConnection();
    onSpy = jest.spyOn(connection, 'on');
    form = new ContentEditorForm(connection, true);
  });

  describe('ContentEditorForm.constructor', () => {
    it('should set up ContentEditorForm.READ_ONLY event', () => {
      expect(connection.on).toHaveBeenCalledWith(FORM.READ_ONLY, expect.any(Function));
    });

    it('should set up ContentEditorForm.CONTENT_EDITOR_MODEL_CHANGE event', () => {
      expect(connection.on).toHaveBeenCalledWith(
        CONTENT_EDITOR_FORM.CONTENT_EDITOR_MODEL_CHANGE,
        expect.any(Function)
      );
    });
  });
  describe('ContentEditorForm.onReadOnlyChange()', () => {
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

  describe('ContentEditorForm.onModelChange()', () => {
    it('should push callback to the onModelChange, and callback method is called', () => {
      const cb = jest.fn();
      form.onModelChange(cb);
      const callOn = onSpy.mock.calls[1][1];
      callOn({ content: { hello: 'world' }, errors: [] });
      expect(cb).toHaveBeenCalledWith([], { hello: 'world' });
    });
    it('should push callback to the onModelChange, callback should not be called', () => {
      const cb = jest.fn();
      const unsubscribe = form.onModelChange(cb);
      const callOn = onSpy.mock.calls[1][1];
      unsubscribe();
      callOn({ content: { hello: 'world' }, errors: [] });
      expect(cb).not.toHaveBeenCalledWith([], { hello: 'world' });
    });
  });

  describe('ContentEditorForm.isValid', () => {
    it('should return true if the form is valid', async () => {
      jest.spyOn(connection, 'request').mockReturnValue(Promise.resolve(true));

      expect(await form.isValid({ hello: 'world' })).toBeTruthy();
      expect(
        connection.request
      ).toHaveBeenCalledWith(CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_IS_VALID, { hello: 'world' });
    });
  });

  describe('ContentEditorForm.validate', () => {
    it('should return error report if the form is invalid', async () => {
      jest
        .spyOn(connection, 'request')
        .mockReturnValue(Promise.resolve([{ path: 'hello', message: 'hello is required' }]));

      expect(await form.validate({ hello: 'world' })).toEqual([
        { path: 'hello', message: 'hello is required' },
      ]);
      expect(
        connection.request
      ).toHaveBeenCalledWith(CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_VALIDATE, { hello: 'world' });
    });

    it('should return undefined if no errors found', async () => {
      jest.spyOn(connection, 'request').mockReturnValue(Promise.resolve([]));

      expect(await form.validate({ hello: 'world' })).toBeUndefined();
      expect(
        connection.request
      ).toHaveBeenCalledWith(CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_VALIDATE, { hello: 'world' });
    });
  });

  describe('ContentEditorForm.setValue', () => {
    it('should return undefined if no errors found', async () => {
      jest.spyOn(connection, 'request').mockReturnValue(Promise.resolve([]));
      expect(await form.setValue({ hello: 'world' })).toBeUndefined();
      expect(connection.request).toHaveBeenCalledWith(CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_SET, {
        hello: 'world',
      });
    });

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

    it('setValue(testValue) should throw when validation errors are returned', async (done) => {
      jest.spyOn(connection, 'request').mockResolvedValue([testError]);
      try {
        await form.setValue({ hello: 'world' });
      } catch (e) {
        expect(e).toEqual([testError]);
        done();
      }
    });
  });

  describe('ContentEditorForm.getValue', () => {
    it('should get the value of the form', async () => {
      jest.spyOn(connection, 'request').mockReturnValue(Promise.resolve({ hello: 'world' }));
      expect(await form.getValue()).toEqual({ hello: 'world' });
      expect(connection.request).toHaveBeenCalledWith(CONTENT_EDITOR_FORM.CONTENT_EDITOR_FORM_GET);
    });

    it('should throw error if no model available', async () => {
      jest.spyOn(connection, 'request').mockReturnValue(Promise.reject(undefined));
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      expect(form.getValue()).rejects.toThrowError(ERRORS.NO_MODEL);
    });
  });
});
