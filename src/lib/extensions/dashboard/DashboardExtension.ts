import { Params } from '../../models/Params';
import { Extension, ExtensionOptions } from '../Extension';
import { DashboardContextObject } from './DashboardContextObject';

export class DashboardExtension<
  FieldType = {},
  ParamType extends Params = Params
> extends Extension<DashboardContextObject<ParamType>> {
  /**
   * Params - optional parameters for your extension.
   */
  public params!: ParamType;
  /**
   * Hub Id - Id of the hub instantiating the Dashboard.
   */
  public hubId!: string;
  /**
   * Location Href - Href of the Dashboards parent container.
   */
  public locationHref!: string;

  constructor(options: ExtensionOptions) {
    super(options);
  }

  setupContext(context: DashboardContextObject<ParamType>) {
    const { hubId, locationHref, params } = context;

    this.hubId = hubId;
    this.locationHref = locationHref;
    this.params = params;
  }
}
