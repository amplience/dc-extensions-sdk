import { ApplicationNavigator } from '../../components/ApplicationNavigator';
import { Params } from '../../models/Params';
import { Extension, ExtensionOptions } from '../Extension';
import { DashboardContextObject } from './DashboardContextObject';

export type hubType = { id: string; name: string };

export class DashboardExtension<ParamType extends Params = Params> extends Extension<
  DashboardContextObject<ParamType>
> {
  /**
   * Params - optional parameters for your extension.
   */
  public params!: ParamType;
  /**
   * Hub Id - Id of the hub instantiating the Dashboard.
   */
  public hubId?: string;
  /**
   * Deprecated
   * hub - name and id of hub 
   */
  public hub!: hubType;
  /**
   * Location Href - Href of the Dashboards parent container.
   */
  public locationHref!: string;
  /**
   * Application Navigator - Able to navigate the user to certain Dynamic Content related pages
   */
  public applicationNavigator!: ApplicationNavigator;

  constructor(options: ExtensionOptions) {
    super(options);
  }

  setupContext(context: DashboardContextObject<ParamType>) {
    const { hubId, hub, locationHref, params } = context;

    this.hub = hub;
    this.hubId = hubId;
    this.locationHref = locationHref;
    this.params = params;
    this.applicationNavigator = new ApplicationNavigator(this.locationHref, this.options.window);
  }
}
