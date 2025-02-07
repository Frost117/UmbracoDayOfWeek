// @ts-ignore
import { LitElement, html, customElement, property, state } from "@umbraco-cms/backoffice/external/lit";
// @ts-ignore
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
// @ts-ignore
import { UMB_AUTH_CONTEXT, UmbAuthContext } from '@umbraco-cms/backoffice/auth';
// @ts-ignore
import { UmbPropertyValueChangeEvent } from '@umbraco-cms/backoffice/property-editor';
// @ts-ignore
import { type UmbPropertyEditorConfigCollection, UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/property-editor";
// @ts-ignore
import type { UUISelectEvent } from '@umbraco-cms/backoffice/external/uui';

@customElement('my-dayoftheweek')
export class MyDayOfTheWeekElement extends UmbElementMixin(LitElement) implements UmbPropertyEditorUiElement {
  #selection = -1;
  
  public get value(){
    return this.#selection;
  };
  
  @property()
  public displayList: Array<any> = [];
  
  @property()
  public defaultStartOfTheWeek = 1; // Monday by default
  
  @property()
  public set value(value) {
    this.#selection = value;
  }
  
  @property()
  public myAuthToken: Promise<string> | undefined;
  
  @property()
  public set config(config: UmbPropertyEditorConfigCollection) {
    let defaultStartDayOfWeekConfigValue = config.getValueByAlias("startOfWeek");
    this._startOfWeek = defaultStartDayOfWeekConfigValue ? defaultStartDayOfWeekConfigValue : this.defaultStartOfTheWeek;
  }
  // @ts-ignore  
  private _authorizationContext: UmbAuthContext;
  
  @state()
  // @ts-ignore
  private _startOfWeek;
  
  @state()
  // @ts-ignore
  private _options: Array<Option> = [];
  
  // @ts-ignore
  #mapList(){
    // @ts-ignore
    this.displayList = this.list.map(item =>({
      // @ts-ignore
      name: this.localize.term(`DayOfTheWeek_d${item.id}`) || item.DefaultName,
      value: item.id,
      selected: this.value || this.value === 0 ? this.value == item.id : false
    }));
    // @ts-ignore
    this.requestUpdate();
    console.log(this.displayList)
  }
  
  #onChange(event: UUISelectEvent){
    this.value = +event.target.value;
    // @ts-ignore
    this.dispatchEvent(new UmbPropertyValueChangeEvent())
    this.#mapList()

  }
  constructor() {
    super();
    // @ts-ignore
    this.consumeContext(UMB_AUTH_CONTEXT, (context) => {
      this._authorizationContext = context;
      this.myAuthToken = context.getLatestToken();
    });
  }
  render() {
    return html`
      <umb-input-dropdown-list
          .options=${this.displayList}
          @change=${this.#onChange}>
      </umb-input-dropdown-list>
    `
  }
    async connectedCallback() {
      super.connectedCallback();
      const defaultStartDayOfWeekConfigValue = this._startOfWeek;
      // @ts-ignore
      this.defaultStartDayOfWeekValue = defaultStartDayOfWeekConfigValue >= 0 && defaultStartDayOfWeekConfigValue < 7 ? defaultStartDayOfWeekConfigValue : this.defaultStartDayOfWeekValue;
      // @ts-ignore
      this.consumeContext(UMB_AUTH_CONTEXT, (context) => {
        // @ts-ignore
        context.getLatestToken().then(promiseToken => {
          try {
            const headers = {
              Authorization: `Bearer ${promiseToken}`
            };
            // @ts-ignore
            fetch(`/umbraco/management/api/v1/get-dropdown-value-list?startDayOfTheWeek=${this.defaultStartDayOfWeekValue}`, {headers}).then(response => response.json())
                .then(results => {
                  // @ts-ignore
                  this.list = results;
                  this.#mapList()
                })
          } catch (e) {
            console.error(e);
          }
        });
      });
    }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-dayoftheweek': MyDayOfTheWeekElement
  }
}
