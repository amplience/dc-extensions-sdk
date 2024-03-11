import { OpenOptions } from '../constants/Navigation';
import { LOCATION_HREF } from '../constants/LocationHref';
import { APPLICATION_NAVIGATOR } from '../constants/Errors';

export class BaseNavigator {
  constructor(public readonly locationHref: string, public window: Window) {}

  navigate(templatedUri: string, options: Partial<OpenOptions>) {
    const base = this.getBaseHref();

    return this.processHref(`${base}/${templatedUri}`, options);
  }

  private processHref(href: string, options: Partial<OpenOptions>): string | undefined {
    if (options.returnHref) {
      return href;
    }
    this.window.parent.location.href = href;
  }

  private getBaseHref() {
    if (this.locationHref.indexOf(LOCATION_HREF.HASH_BANG) === -1) {
      throw new Error(APPLICATION_NAVIGATOR.MUST_INCLUDE_HASH_BANG);
    }

    const [baseUrl, hash] = this.locationHref.split(LOCATION_HREF.HASH_BANG);
    const hubName = hash.split('/')[1];

    return `${baseUrl}${LOCATION_HREF.HASH_BANG}/${hubName}`;
  }
}
