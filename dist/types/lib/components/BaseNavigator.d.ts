import { OpenOptions } from '../constants/Navigation';
export declare class BaseNavigator {
    readonly locationHref: string;
    window: Window;
    constructor(locationHref: string, window: Window);
    navigate(templatedUri: string, options?: Partial<OpenOptions>): string | undefined;
    private processHref;
    private getBaseHref;
}
