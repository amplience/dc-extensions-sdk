import { ApplicationNavigator } from "../../components/ApplicationNavigator";
import { Params } from "../../models/Params";
import { Extension, ExtensionOptions } from '../Extension';
import { RouteContextObject } from './RouteContextObject';

export class RouteExtension<ParamType extends Params = Params> extends Extension<
RouteContextObject<ParamType>
> {
  /**
   * Params - optional parameters for your extension.
   */
  public params!: ParamType;
  /**
   * Hub Id - Id of the hub instantiating the Route.
   */
  public hubId!: string;
  /**
   * Location Href - Href of the Route parent container.
   */
  public locationHref!: string;
  /**
   * Application Navigator - Able to navigate the user to certain Dynamic Content related pages
   */
  public applicationNavigator!: ApplicationNavigator;

  constructor(options: ExtensionOptions) {
    super(options);
  }

  setupContext(context: RouteContextObject<ParamType>) {
    const { hubId, locationHref, params } = context;

    this.hubId = hubId;
    this.locationHref = locationHref;
    this.params = params;
    this.applicationNavigator = new ApplicationNavigator(this.locationHref, this.options.window);
  }
}