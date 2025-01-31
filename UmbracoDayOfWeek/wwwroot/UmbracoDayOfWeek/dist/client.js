import { LitElement as T, html as O, property as l, state as y, customElement as W } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as g } from "@umbraco-cms/backoffice/element-api";
import { UMB_AUTH_CONTEXT as w } from "@umbraco-cms/backoffice/auth";
import { UmbPropertyValueChangeEvent as C } from "@umbraco-cms/backoffice/property-editor";
var D = Object.defineProperty, E = Object.getOwnPropertyDescriptor, v = (e) => {
  throw TypeError(e);
}, o = (e, t, a, r) => {
  for (var s = r > 1 ? void 0 : r ? E(t, a) : t, p = e.length - 1, u; p >= 0; p--)
    (u = e[p]) && (s = (r ? u(t, a, s) : u(s)) || s);
  return r && s && D(t, a, s), s;
}, f = (e, t, a) => t.has(e) || v("Cannot " + a), c = (e, t, a) => (f(e, t, "read from private field"), a ? a.call(e) : t.get(e)), d = (e, t, a) => t.has(e) ? v("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, a), A = (e, t, a, r) => (f(e, t, "write to private field"), t.set(e, a), a), _ = (e, t, a) => (f(e, t, "access private method"), a), i, h, m, k;
let n = class extends g(T) {
  constructor() {
    super(), d(this, h), d(this, i, ""), this.defaultStartOfTheWeek = 1, this.readonly = !1, this._options = [], this.consumeContext(w, (e) => {
      this._authorizationContext = e, this.myAuthToken = e.getLatestToken();
    });
  }
  get value() {
    return c(this, i);
  }
  set value(e) {
    A(this, i, e || "");
  }
  set config(e) {
    let t = e.getValueByAlias("startOfWeek");
    this._startOfWeek = t || this.defaultStartOfTheWeek;
    const a = t || this.defaultStartOfTheWeek;
    Array.isArray(a) && a.length > 0 && (this._options = typeof a[0] == "string" ? a.map((r) => ({ name: r, value: r, selected: c(this, i).includes(r) })) : a.map((r) => ({
      name: r.name,
      value: r.value,
      selected: c(this, i).includes(r.value)
    })));
  }
  render() {
    return O`
      <umb-input-dropdown-list
          .options=${this._options.map((e) => ({
      name: e.name,
      value: e.value,
      selected: e.selected
    }))}
          @change=${_(this, h, m)}
          ?readonly=${this.readonly}>
      </umb-input-dropdown-list>
    `;
  }
  async connectedCallback(e) {
    super.connectedCallback(e), await this.getDayOfTheWeek();
  }
  async getDayOfTheWeek() {
    try {
      const t = {
        Authorization: `Bearer ${await this.myAuthToken}`
      }, a = await fetch(`/umbraco/management/api/v1/get-dropdown-value-list?startDayOfTheWeek=${this._startOfWeek}`, { headers: t }).then((r) => r.json());
      this._options = a.map((r) => {
        let s = this.localize.term(`DayOfTheWeek_d${r.id}`);
        return {
          name: s !== `DayOfTheWeek_d${r.id}` ? s : r.defaultName,
          value: r.id,
          selected: this.value ? this.value == r.id : !1
        };
      }), console.log(this._options);
    } catch (e) {
      console.error(e);
    }
  }
};
i = /* @__PURE__ */ new WeakMap();
h = /* @__PURE__ */ new WeakSet();
m = function(e) {
  const t = e.target.value;
  _(this, h, k).call(this, t);
};
k = function(e) {
  e && (this.value = e, this.dispatchEvent(new C()));
};
o([
  l({ type: Number })
], n.prototype, "defaultStartOfTheWeek", 2);
o([
  l({ type: String })
], n.prototype, "value", 1);
o([
  l()
], n.prototype, "myAuthToken", 2);
o([
  l({ type: Boolean, reflect: !0 })
], n.prototype, "readonly", 2);
o([
  l({ attribute: !1 })
], n.prototype, "config", 1);
o([
  y()
], n.prototype, "_startOfWeek", 2);
o([
  y()
], n.prototype, "_options", 2);
n = o([
  W("my-dayoftheweek")
], n);
export {
  n as MyDayOfTheWeekElement
};
//# sourceMappingURL=client.js.map
