import { ApplicationNavigator } from '../../components/ApplicationNavigator';
import { Params } from '../../models/Params';
import { Extension, ExtensionOptions } from '../Extension';
import { DashboardContextObject } from './DashboardContextObject';
export declare type Hub = {
    id: string;
    name: string;
    organizationId?: string;
};
export declare class DashboardExtension<ParamType extends Params = Params> extends Extension<DashboardContextObject<ParamType>> {
    /**
     * Params - optional parameters for your extension.
     */
    params: ParamType;
    /**
     * @deprecated has been superseded by the hub object.
     * Hub Id - Id of the hub instantiating the Dashboard.
     */
    hubId: string;
    /**
     * Hub - Hub id, Hub name and organization ID
     */
    hub: Hub;
    /**
     * Location Href - Href of the Dashboard's parent container.
     */
    locationHref: string;
    /**
     * Application Navigator - Able to navigate the user to certain Dynamic Content related pages
     */
    applicationNavigator: ApplicationNavigator;
    constructor(options: ExtensionOptions, context: DashboardContextObject<ParamType>);
    setupContext(context: DashboardContextObject<ParamType>): void;
}
