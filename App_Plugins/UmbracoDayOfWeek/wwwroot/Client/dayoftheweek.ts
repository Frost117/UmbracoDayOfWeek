//@ts-ignore
import { LitElement, html, customElement, property, state } from "@umbraco-cms/backoffice/external/lit";
//@ts-ignore
import { UmbElementMixin } from "@umbraco-cms/backoffice/element-api";
//@ts-ignore
import { UMB_AUTH_CONTEXT, UmbAuthContext } from '@umbraco-cms/backoffice/auth';
//@ts-ignore
import { UmbPropertyValueChangeEvent } from '@umbraco-cms/backoffice/property-editor';
//@ts-ignore
import { type UmbPropertyEditorConfigCollection, UmbPropertyEditorUiElement } from "@umbraco-cms/backoffice/property-editor";
//@ts-ignore
import type { UUISelectEvent } from '@umbraco-cms/backoffice/external/uui';

@customElement('my-dayoftheweek')
export class MyDayOfTheWeekElement extends UmbElementMixin(LitElement) implements UmbPropertyEditorUiElement {
  #selection: string = "";
  
  public get value(): string | undefined {
    return this.#selection;
  };

  @property({ type: Number })
  public defaultStartOfTheWeek: number = 1; // Monday by default
  
  @property({ type: String })
  public set value(value: string | null | undefined) {
    this.#selection = value || "";
  }
  
  @property()
  public myAuthToken: Promise<string> | undefined;
  
  @property({ type: Boolean, reflect: true })
  readonly = false;
  
  @property({ attribute: false})
  public set config(config: UmbPropertyEditorConfigCollection | undefined) {
    
    let defaultStartDayOfWeekConfigValue = config.getValueByAlias("startOfWeek");
    this._startOfWeek = defaultStartDayOfWeekConfigValue ? defaultStartDayOfWeekConfigValue : this.defaultStartOfTheWeek;

    const items = defaultStartDayOfWeekConfigValue ? defaultStartDayOfWeekConfigValue : this.defaultStartOfTheWeek;
    
    if (Array.isArray(items) && items.length > 0) {
      this._options =
          typeof items[0] == 'string'
              ? items.map((item) => ({ name: item, value: item, selected: this.#selection.includes(item) }))
              : items.map((item) => ({
                name: item.name,
                value: item.value,
                selected: this.#selection.includes(item.value),
              }));
    }
  }
  
  //@ts-ignore
  private _authorizationContext: UmbAuthContext;
  
  @state()
  //@ts-ignore
  private _startOfWeek: number;
  
  
  @state()
  //@ts-ignore
  private _options: Array<Option> = [];
  
  #onChange(event: UUISelectEvent){
    const value = event.target.value;
    this.#setValue(value);
  }
  #setValue(value: string | null | undefined) {
    if (!value) return;
    this.value = value;
    //@ts-ignore
    this.dispatchEvent(new UmbPropertyValueChangeEvent());
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
          .options=${this._options.map(option => ({ 
            name: option.name, 
            value: option.value, 
            selected: option.selected }))}
          @change=${this.#onChange}
          ?readonly=${this.readonly}>
      </umb-input-dropdown-list>
    `
  }
    async connectedCallback(changed: any) {
        super.connectedCallback(changed);
        await this.getDayOfTheWeek();
    }
  private async getDayOfTheWeek() {
    try{
      const promiseToken: string | undefined = await this.myAuthToken;
      const headers = {
        'Authorization': `Bearer ${promiseToken}`
      };
      
      const response = await fetch(`/umbraco/management/api/v1/get-dropdown-value-list?startDayOfTheWeek=${this._startOfWeek}`, {headers}).then(response => response.json());
      
      this._options = response.map((item: any) => {
        //@ts-ignore
        let localizedTerm = this.localize.term(`DayOfTheWeek_d${item.id}`);
        return{
          name: localizedTerm !== `DayOfTheWeek_d${item.id}` ? localizedTerm : item.defaultName,
          value: item.id,
          selected: this.value ? this.value == item.id : false
        }
      });
      
      console.log(this._options);

    } catch (e) {
      console.error(e);
    }
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-dayoftheweek': MyDayOfTheWeekElement
  }
}
