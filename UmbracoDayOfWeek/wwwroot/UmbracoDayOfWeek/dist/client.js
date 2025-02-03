import { LitElement as O, html as W, property as l, state as _, customElement as g } from "@umbraco-cms/backoffice/external/lit";
import { UmbElementMixin as T } from "@umbraco-cms/backoffice/element-api";
import { UMB_AUTH_CONTEXT as y } from "@umbraco-cms/backoffice/auth";
import { UmbPropertyValueChangeEvent as C } from "@umbraco-cms/backoffice/property-editor";
var D = Object.defineProperty, w = Object.getOwnPropertyDescriptor, m = (t) => {
  throw TypeError(t);
}, o = (t, e, a, r) => {
  for (var s = r > 1 ? void 0 : r ? w(e, a) : e, p = t.length - 1, f; p >= 0; p--)
    (f = t[p]) && (s = (r ? f(e, a, s) : f(s)) || s);
  return r && s && D(e, a, s), s;
}, c = (t, e, a) => e.has(t) || m("Cannot " + a), S = (t, e, a) => (c(t, e, "read from private field"), a ? a.call(t) : e.get(t)), v = (t, e, a) => e.has(t) ? m("Cannot add the same private member more than once") : e instanceof WeakSet ? e.add(t) : e.set(t, a), E = (t, e, a, r) => (c(t, e, "write to private field"), e.set(t, a), a), u = (t, e, a) => (c(t, e, "access private method"), a), h, n, d, k;
let i = class extends T(O) {
  constructor() {
    super(), v(this, n), v(this, h, -1), this.displayList = [], this.defaultStartOfTheWeek = 1, this._options = [], this.consumeContext(y, (t) => {
      this._authorizationContext = t, this.myAuthToken = t.getLatestToken();
    });
  }
  get value() {
    return S(this, h);
  }
  set value(t) {
    E(this, h, t);
  }
  set config(t) {
    let e = t.getValueByAlias("startOfWeek");
    this._startOfWeek = e || this.defaultStartOfTheWeek;
  }
  render() {
    return W`
      <umb-input-dropdown-list
          .options=${this.displayList}
          @change=${u(this, n, k)}>
      </umb-input-dropdown-list>
    `;
  }
  async connectedCallback() {
    super.connectedCallback();
    const t = this._startOfWeek;
    this.defaultStartDayOfWeekValue = t >= 0 && t < 7 ? t : this.defaultStartDayOfWeekValue, this.consumeContext(y, (e) => {
      e.getLatestToken().then((a) => {
        try {
          const r = {
            Authorization: `Bearer ${a}`
          };
          fetch(`/umbraco/management/api/v1/get-dropdown-value-list?startDayOfTheWeek=${this.defaultStartDayOfWeekValue}`, { headers: r }).then((s) => s.json()).then((s) => {
            this.list = s, u(this, n, d).call(this);
          });
        } catch (r) {
          console.error(r);
        }
      });
    });
  }
};
h = /* @__PURE__ */ new WeakMap();
n = /* @__PURE__ */ new WeakSet();
d = function() {
  this.displayList = this.list.map((t) => ({
    // @ts-ignore
    name: this.localize.term(`DayOfTheWeek_d${t.id}`) || t.DefaultName,
    value: t.id,
    selected: this.value || this.value === 0 ? this.value == t.id : !1
  })), this.requestUpdate(), console.log(this.displayList);
};
k = function(t) {
  this.value = +t.target.value, this.dispatchEvent(new C()), u(this, n, d).call(this);
};
o([
  l()
], i.prototype, "displayList", 2);
o([
  l({ type: Number })
], i.prototype, "defaultStartOfTheWeek", 2);
o([
  l({ type: Number })
], i.prototype, "value", 1);
o([
  l()
], i.prototype, "myAuthToken", 2);
o([
  l({ attribute: !1 })
], i.prototype, "config", 1);
o([
  _()
], i.prototype, "_startOfWeek", 2);
o([
  _()
], i.prototype, "_options", 2);
i = o([
  g("my-dayoftheweek")
], i);
export {
  i as MyDayOfTheWeekElement
};
//# sourceMappingURL=client.js.map
