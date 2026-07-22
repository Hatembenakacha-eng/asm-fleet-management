import {
  isPlatformBrowser
} from "./chunk-BQENWTIB.js";
import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  DOCUMENT,
  Directive,
  ElementRef,
  EnvironmentInjector,
  EventEmitter,
  Injectable,
  InjectionToken,
  Injector,
  Input,
  NgModule,
  NgZone,
  Observable,
  Output,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
  Service,
  Subject,
  ViewChild,
  afterNextRender,
  afterRenderEffect,
  animationFrameScheduler,
  booleanAttribute,
  combineLatest,
  computed,
  createComponent,
  debounceTime,
  delay,
  effect,
  filter,
  forwardRef,
  from,
  fromEvent,
  inject,
  input,
  inputBinding,
  interval,
  linkedSignal,
  makeEnvironmentProviders,
  map,
  merge,
  numberAttribute,
  of,
  output,
  setClassMetadata,
  shareReplay,
  signal,
  startWith,
  switchMap,
  takeUntil,
  takeWhile,
  tap,
  throttleTime,
  untracked,
  viewChild,
  ɵɵHostDirectivesFeature,
  ɵɵInheritDefinitionFeature,
  ɵɵProvidersFeature,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵconditionalCreate,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵdefineService,
  ɵɵdomElement,
  ɵɵdomElementEnd,
  ɵɵdomElementStart,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetInheritedFactory,
  ɵɵinterpolate1,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵprojection,
  ɵɵprojectionDef,
  ɵɵproperty,
  ɵɵqueryAdvance,
  ɵɵstyleProp,
  ɵɵviewQuerySignal
} from "./chunk-CFKQGSET.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-GOMI4DH3.js";

// node_modules/@angular/cdk/fesm2022/_directionality-chunk.mjs
var DIR_DOCUMENT = new InjectionToken("cdk-dir-doc", {
  providedIn: "root",
  factory: () => inject(DOCUMENT)
});
var RTL_LOCALE_PATTERN = /^(ar|ckb|dv|he|iw|fa|nqo|ps|sd|ug|ur|yi|.*[-_](Adlm|Arab|Hebr|Nkoo|Rohg|Thaa))(?!.*[-_](Latn|Cyrl)($|-|_))($|-|_)/i;
function _resolveDirectionality(rawValue) {
  const value = rawValue?.toLowerCase() || "";
  if (value === "auto" && typeof navigator !== "undefined" && navigator?.language) {
    return RTL_LOCALE_PATTERN.test(navigator.language) ? "rtl" : "ltr";
  }
  return value === "rtl" ? "rtl" : "ltr";
}
var Directionality = class _Directionality {
  get value() {
    return this.valueSignal();
  }
  valueSignal = signal("ltr", ...ngDevMode ? [{
    debugName: "valueSignal"
  }] : []);
  change = new EventEmitter();
  constructor() {
    const _document = inject(DIR_DOCUMENT, {
      optional: true
    });
    if (_document) {
      const bodyDir = _document.body ? _document.body.dir : null;
      const htmlDir = _document.documentElement ? _document.documentElement.dir : null;
      this.valueSignal.set(_resolveDirectionality(bodyDir || htmlDir || "ltr"));
    }
  }
  ngOnDestroy() {
    this.change.complete();
  }
  static ɵfac = function Directionality_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Directionality)();
  };
  static ɵprov = ɵɵdefineService({
    token: _Directionality,
    factory: _Directionality.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Directionality, [{
    type: Service
  }], () => [], null);
})();

// node_modules/@angular/cdk/fesm2022/bidi.mjs
var Dir = class _Dir {
  _isInitialized = false;
  _rawDir = "";
  change = new EventEmitter();
  get dir() {
    return this.valueSignal();
  }
  set dir(value) {
    const previousValue = this.valueSignal();
    this.valueSignal.set(_resolveDirectionality(value));
    this._rawDir = value;
    if (previousValue !== this.valueSignal() && this._isInitialized) {
      this.change.emit(this.valueSignal());
    }
  }
  get value() {
    return this.dir;
  }
  valueSignal = signal("ltr", ...ngDevMode ? [{
    debugName: "valueSignal"
  }] : []);
  ngAfterContentInit() {
    this._isInitialized = true;
  }
  ngOnDestroy() {
    this.change.complete();
  }
  static ɵfac = function Dir_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Dir)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _Dir,
    selectors: [["", "dir", ""]],
    hostVars: 1,
    hostBindings: function Dir_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("dir", ctx._rawDir);
      }
    },
    inputs: {
      dir: "dir"
    },
    outputs: {
      change: "dirChange"
    },
    exportAs: ["dir"],
    features: [ɵɵProvidersFeature([{
      provide: Directionality,
      useExisting: _Dir
    }])]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Dir, [{
    type: Directive,
    args: [{
      selector: "[dir]",
      providers: [{
        provide: Directionality,
        useExisting: Dir
      }],
      host: {
        "[attr.dir]": "_rawDir"
      },
      exportAs: "dir"
    }]
  }], null, {
    change: [{
      type: Output,
      args: ["dirChange"]
    }],
    dir: [{
      type: Input
    }]
  });
})();
var BidiModule = class _BidiModule {
  static ɵfac = function BidiModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BidiModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _BidiModule,
    imports: [Dir],
    exports: [Dir]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(BidiModule, [{
    type: NgModule,
    args: [{
      imports: [Dir],
      exports: [Dir]
    }]
  }], null, null);
})();

// node_modules/@angular/cdk/fesm2022/_element-chunk.mjs
function coerceNumberProperty(value, fallbackValue = 0) {
  if (_isNumberValue(value)) {
    return Number(value);
  }
  return arguments.length === 2 ? fallbackValue : 0;
}
function _isNumberValue(value) {
  return !isNaN(parseFloat(value)) && !isNaN(Number(value));
}
function coerceElement(elementOrRef) {
  return elementOrRef instanceof ElementRef ? elementOrRef.nativeElement : elementOrRef;
}

// node_modules/ngx-scrollbar/fesm2022/ngx-scrollbar-smooth-scroll.mjs
var defaultSmoothScrollOptions = {
  duration: 468,
  easing: {
    x1: 0.42,
    y1: 0,
    x2: 0.58,
    y2: 1
  }
};
var SMOOTH_SCROLL_OPTIONS = new InjectionToken("SMOOTH_SCROLL_OPTIONS", {
  providedIn: "root",
  factory: () => defaultSmoothScrollOptions
});
var SmoothScrollManager = class _SmoothScrollManager {
  document = inject(DOCUMENT);
  _defaultOptions = inject(SMOOTH_SCROLL_OPTIONS);
  onGoingAnimations = /* @__PURE__ */ new Map();
  abortControllers = /* @__PURE__ */ new Map();
  /**
   * Handles a given parameter of type HTMLElement, ElementRef or selector
   */
  getElement(el, parent) {
    if (typeof el === "string") {
      return (parent || this.document).querySelector(el);
    }
    return coerceElement(el);
  }
  cancelOngoingAnimation(el) {
    const existingAnimation = this.onGoingAnimations.get(el);
    if (existingAnimation) {
      existingAnimation.cancel();
    }
    this.cleanup(el);
  }
  cleanup(el) {
    const controller = this.abortControllers.get(el);
    if (controller) {
      controller.abort();
      this.abortControllers.delete(el);
    }
    this.onGoingAnimations.delete(el);
  }
  applyScrollToOptions(el, options) {
    this.cancelOngoingAnimation(el);
    if (!options.duration) {
      el.scrollLeft = options.left ?? el.scrollLeft;
      el.scrollTop = options.top ?? el.scrollTop;
      return new Promise((resolve) => requestAnimationFrame(() => resolve()));
    }
    return new Promise((resolve) => {
      const startX = el.scrollLeft;
      const startY = el.scrollTop;
      const endX = options.left ?? startX;
      const endY = options.top ?? startY;
      const easingStr = `cubic-bezier(${options.easing.x1}, ${options.easing.y1}, ${options.easing.x2}, ${options.easing.y2})`;
      const animation = el.animate([], {
        duration: options.duration,
        easing: easingStr
      });
      this.onGoingAnimations.set(el, animation);
      const controller = new AbortController();
      this.abortControllers.set(el, controller);
      const interrupt = () => controller.abort();
      el.addEventListener("wheel", interrupt, {
        passive: true,
        capture: true,
        signal: controller.signal
      });
      el.addEventListener("touchmove", interrupt, {
        passive: true,
        capture: true,
        signal: controller.signal
      });
      const update = () => {
        if (animation.playState !== "running" || controller.signal.aborted) return;
        const progress = animation.effect?.getComputedTiming().progress ?? 1;
        el.scrollLeft = startX + (endX - startX) * progress;
        el.scrollTop = startY + (endY - startY) * progress;
        requestAnimationFrame(update);
      };
      requestAnimationFrame(update);
      animation.onfinish = () => {
        if (!controller.signal.aborted) {
          el.scrollLeft = endX;
          el.scrollTop = endY;
        }
        this.cleanup(el);
        requestAnimationFrame(() => {
          requestAnimationFrame(() => resolve());
        });
      };
      animation.oncancel = () => {
        this.cleanup(el);
        resolve();
      };
      controller.signal.addEventListener("abort", () => animation.cancel(), {
        once: true
      });
    });
  }
  /**
   * Scrolls to the specified offsets. This is a normalized version of the browser's native scrollTo
   * method, since browsers are not consistent about what scrollLeft means in RTL. For this method
   * left and right always refer to the left and right side of the scrolling container irrespective
   * of the layout direction. start and end refer to left and right in an LTR context and vice-versa
   * in an RTL context.
   * @param scrollable element
   * @param customOptions specified the offsets to scroll to.
   */
  scrollTo(scrollable, customOptions) {
    const el = this.getElement(scrollable);
    const isRtl = getComputedStyle(el).direction === "rtl";
    const options = __spreadValues(__spreadValues(__spreadValues({}, this._defaultOptions), customOptions), {
      // Rewrite start & end offsets as right or left offsets.
      left: customOptions.left == null ? isRtl ? customOptions.end : customOptions.start : customOptions.left,
      right: customOptions.right == null ? isRtl ? customOptions.start : customOptions.end : customOptions.right
    });
    if (options.bottom != null) {
      options.top = el.scrollHeight - el.clientHeight - options.bottom;
    }
    if (isRtl) {
      if (options.left != null) {
        options.right = el.scrollWidth - el.clientWidth - options.left;
      }
      options.left = options.right ? -options.right : options.right;
    } else {
      if (options.right != null) {
        options.left = el.scrollWidth - el.clientWidth - options.right;
      }
    }
    return this.applyScrollToOptions(el, options);
  }
  /**
   * Scroll to element by reference or selector
   */
  scrollToElement(scrollable, target, customOptions = {}) {
    const scrollableEl = this.getElement(scrollable);
    const targetEl = this.getElement(target, scrollableEl);
    const isRtl = getComputedStyle(scrollableEl).direction === "rtl";
    if (!targetEl || !scrollableEl) {
      return Promise.resolve();
    }
    const scrollableRect = scrollableEl.getBoundingClientRect();
    const targetRect = targetEl.getBoundingClientRect();
    const options = __spreadValues(__spreadValues(__spreadValues({}, this._defaultOptions), customOptions), {
      top: targetRect.top + scrollableEl.scrollTop - scrollableRect.top + (customOptions.top || 0),
      // Rewrite start & end offsets as right or left offsets.
      left: customOptions.left == null ? isRtl ? customOptions.end : customOptions.start : customOptions.left,
      right: customOptions.right == null ? isRtl ? customOptions.start : customOptions.end : customOptions.right
    });
    if (customOptions.center) {
      const containerCenterX = scrollableRect.left + scrollableRect.width / 2;
      const containerCenterY = scrollableRect.top + scrollableRect.height / 2;
      const targetCenterX = targetRect.left + targetRect.width / 2;
      const targetCenterY = targetRect.top + targetRect.height / 2;
      options.left = targetCenterX - containerCenterX + scrollableEl.scrollLeft;
      options.top = targetCenterY - containerCenterY + scrollableEl.scrollTop;
      return this.applyScrollToOptions(scrollableEl, options);
    }
    if (options.bottom != null) {
      const bottomEdge = scrollableRect.height - targetRect.height;
      options.top = targetRect.top + scrollableEl.scrollTop - scrollableRect.top - bottomEdge + (customOptions.bottom || 0);
    }
    if (isRtl) {
      options.left = targetRect.left - scrollableRect.left + scrollableEl.scrollLeft + (options.left || 0);
      if (options.right != null) {
        options.left = targetRect.right - scrollableRect.left + scrollableEl.scrollLeft - scrollableRect.width + (options.right || 0);
      }
    } else {
      options.left = targetRect.left - scrollableRect.left + scrollableEl.scrollLeft + (options.left || 0);
      if (options.right != null) {
        options.left = targetRect.right - scrollableRect.left + scrollableEl.scrollLeft - scrollableRect.width + (options.right || 0);
      }
    }
    const computedOptions = {
      top: options.top,
      left: options.left,
      easing: options.easing,
      duration: options.duration
    };
    return this.applyScrollToOptions(scrollableEl, computedOptions);
  }
  static ɵfac = function SmoothScrollManager_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SmoothScrollManager)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _SmoothScrollManager,
    factory: _SmoothScrollManager.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SmoothScrollManager, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var SmoothScroll = class _SmoothScroll {
  smoothScroll = inject(SmoothScrollManager);
  element = inject(ElementRef);
  scrollTo(options) {
    return this.smoothScroll.scrollTo(this.element, options);
  }
  scrollToElement(target, options) {
    return this.smoothScroll.scrollToElement(this.element, target, options);
  }
  static ɵfac = function SmoothScroll_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SmoothScroll)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _SmoothScroll,
    selectors: [["", "smoothScroll", ""]],
    exportAs: ["smoothScroll"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SmoothScroll, [{
    type: Directive,
    args: [{
      selector: "[smoothScroll]",
      exportAs: "smoothScroll"
    }]
  }], null, null);
})();

// node_modules/@angular/cdk/fesm2022/_platform-chunk.mjs
var hasV8BreakIterator;
try {
  hasV8BreakIterator = typeof Intl !== "undefined" && Intl.v8BreakIterator;
} catch {
  hasV8BreakIterator = false;
}
var Platform = class _Platform {
  _platformId = inject(PLATFORM_ID);
  isBrowser = this._platformId ? isPlatformBrowser(this._platformId) : typeof document === "object" && !!document;
  EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent);
  TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent);
  BLINK = this.isBrowser && !!(window.chrome || hasV8BreakIterator) && typeof CSS !== "undefined" && !this.EDGE && !this.TRIDENT;
  WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT;
  IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !("MSStream" in window);
  FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent);
  ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT;
  SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
  static ɵfac = function Platform_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Platform)();
  };
  static ɵprov = ɵɵdefineService({
    token: _Platform,
    factory: _Platform.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Platform, [{
    type: Service
  }], null, null);
})();

// node_modules/@angular/cdk/fesm2022/_scrolling-chunk.mjs
var RtlScrollAxisType;
(function(RtlScrollAxisType2) {
  RtlScrollAxisType2[RtlScrollAxisType2["NORMAL"] = 0] = "NORMAL";
  RtlScrollAxisType2[RtlScrollAxisType2["NEGATED"] = 1] = "NEGATED";
  RtlScrollAxisType2[RtlScrollAxisType2["INVERTED"] = 2] = "INVERTED";
})(RtlScrollAxisType || (RtlScrollAxisType = {}));

// node_modules/@angular/cdk/fesm2022/platform.mjs
var PlatformModule = class _PlatformModule {
  static ɵfac = function PlatformModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PlatformModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _PlatformModule
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(PlatformModule, [{
    type: NgModule,
    args: [{}]
  }], null, null);
})();

// node_modules/@angular/cdk/fesm2022/observers-private.mjs
var loopLimitExceededErrorHandler = (e) => {
  if (e instanceof ErrorEvent && e.message === "ResizeObserver loop limit exceeded") {
    console.error(`${e.message}. This could indicate a performance issue with your app. See https://github.com/WICG/resize-observer/blob/master/explainer.md#error-handling`);
  }
};
var SingleBoxSharedResizeObserver = class {
  _box;
  _destroyed = new Subject();
  _resizeSubject = new Subject();
  _resizeObserver;
  _elementObservables = /* @__PURE__ */ new Map();
  constructor(_box) {
    this._box = _box;
    if (typeof ResizeObserver !== "undefined") {
      this._resizeObserver = new ResizeObserver((entries) => this._resizeSubject.next(entries));
    }
  }
  observe(target) {
    if (!this._elementObservables.has(target)) {
      this._elementObservables.set(target, new Observable((observer) => {
        const subscription = this._resizeSubject.subscribe(observer);
        this._resizeObserver?.observe(target, {
          box: this._box
        });
        return () => {
          this._resizeObserver?.unobserve(target);
          subscription.unsubscribe();
          this._elementObservables.delete(target);
        };
      }).pipe(filter((entries) => entries.some((entry) => entry.target === target)), shareReplay({
        bufferSize: 1,
        refCount: true
      }), takeUntil(this._destroyed)));
    }
    return this._elementObservables.get(target);
  }
  destroy() {
    this._destroyed.next();
    this._destroyed.complete();
    this._resizeSubject.complete();
    this._elementObservables.clear();
  }
};
var SharedResizeObserver = class _SharedResizeObserver {
  _cleanupErrorListener;
  _observers = /* @__PURE__ */ new Map();
  _ngZone = inject(NgZone);
  constructor() {
    if (typeof ResizeObserver !== "undefined" && (typeof ngDevMode === "undefined" || ngDevMode)) {
      this._ngZone.runOutsideAngular(() => {
        const renderer = inject(RendererFactory2).createRenderer(null, null);
        this._cleanupErrorListener = renderer.listen("window", "error", loopLimitExceededErrorHandler);
      });
    }
  }
  ngOnDestroy() {
    for (const [, observer] of this._observers) {
      observer.destroy();
    }
    this._observers.clear();
    this._cleanupErrorListener?.();
  }
  observe(target, options) {
    const box = options?.box || "content-box";
    if (!this._observers.has(box)) {
      this._observers.set(box, new SingleBoxSharedResizeObserver(box));
    }
    return this._observers.get(box).observe(target);
  }
  static ɵfac = function SharedResizeObserver_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SharedResizeObserver)();
  };
  static ɵprov = ɵɵdefineService({
    token: _SharedResizeObserver,
    factory: _SharedResizeObserver.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(SharedResizeObserver, [{
    type: Service
  }], () => [], null);
})();

// node_modules/@angular/cdk/fesm2022/observers.mjs
function shouldIgnoreRecord(record) {
  if (record.type === "characterData" && record.target instanceof Comment) {
    return true;
  }
  if (record.type === "childList") {
    for (let i = 0; i < record.addedNodes.length; i++) {
      if (!(record.addedNodes[i] instanceof Comment)) {
        return false;
      }
    }
    for (let i = 0; i < record.removedNodes.length; i++) {
      if (!(record.removedNodes[i] instanceof Comment)) {
        return false;
      }
    }
    return true;
  }
  return false;
}
var MutationObserverFactory = class _MutationObserverFactory {
  create(callback) {
    return typeof MutationObserver === "undefined" ? null : new MutationObserver(callback);
  }
  static ɵfac = function MutationObserverFactory_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _MutationObserverFactory)();
  };
  static ɵprov = ɵɵdefineService({
    token: _MutationObserverFactory,
    factory: _MutationObserverFactory.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(MutationObserverFactory, [{
    type: Service
  }], null, null);
})();
var ContentObserver = class _ContentObserver {
  _mutationObserverFactory = inject(MutationObserverFactory);
  _observedElements = /* @__PURE__ */ new Map();
  _ngZone = inject(NgZone);
  ngOnDestroy() {
    this._observedElements.forEach((_, element) => this._cleanupObserver(element));
  }
  observe(elementOrRef) {
    const element = coerceElement(elementOrRef);
    return new Observable((observer) => {
      const stream = this._observeElement(element);
      const subscription = stream.pipe(map((records) => records.filter((record) => !shouldIgnoreRecord(record))), filter((records) => !!records.length)).subscribe((records) => {
        this._ngZone.run(() => {
          observer.next(records);
        });
      });
      return () => {
        subscription.unsubscribe();
        this._unobserveElement(element);
      };
    });
  }
  _observeElement(element) {
    return this._ngZone.runOutsideAngular(() => {
      if (!this._observedElements.has(element)) {
        const stream = new Subject();
        const observer = this._mutationObserverFactory.create((mutations) => stream.next(mutations));
        if (observer) {
          observer.observe(element, {
            characterData: true,
            childList: true,
            subtree: true
          });
        }
        this._observedElements.set(element, {
          observer,
          stream,
          count: 1
        });
      } else {
        this._observedElements.get(element).count++;
      }
      return this._observedElements.get(element).stream;
    });
  }
  _unobserveElement(element) {
    if (this._observedElements.has(element)) {
      this._observedElements.get(element).count--;
      if (!this._observedElements.get(element).count) {
        this._cleanupObserver(element);
      }
    }
  }
  _cleanupObserver(element) {
    if (this._observedElements.has(element)) {
      const {
        observer,
        stream
      } = this._observedElements.get(element);
      if (observer) {
        observer.disconnect();
      }
      stream.complete();
      this._observedElements.delete(element);
    }
  }
  static ɵfac = function ContentObserver_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ContentObserver)();
  };
  static ɵprov = ɵɵdefineService({
    token: _ContentObserver,
    factory: _ContentObserver.ɵfac
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ContentObserver, [{
    type: Service
  }], null, null);
})();
var CdkObserveContent = class _CdkObserveContent {
  _contentObserver = inject(ContentObserver);
  _elementRef = inject(ElementRef);
  event = new EventEmitter();
  get disabled() {
    return this._disabled;
  }
  set disabled(value) {
    this._disabled = value;
    this._disabled ? this._unsubscribe() : this._subscribe();
  }
  _disabled = false;
  get debounce() {
    return this._debounce;
  }
  set debounce(value) {
    this._debounce = coerceNumberProperty(value);
    this._subscribe();
  }
  _debounce;
  _currentSubscription = null;
  ngAfterContentInit() {
    if (!this._currentSubscription && !this.disabled) {
      this._subscribe();
    }
  }
  ngOnDestroy() {
    this._unsubscribe();
  }
  _subscribe() {
    this._unsubscribe();
    const stream = this._contentObserver.observe(this._elementRef);
    this._currentSubscription = (this.debounce ? stream.pipe(debounceTime(this.debounce)) : stream).subscribe(this.event);
  }
  _unsubscribe() {
    this._currentSubscription?.unsubscribe();
  }
  static ɵfac = function CdkObserveContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _CdkObserveContent)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _CdkObserveContent,
    selectors: [["", "cdkObserveContent", ""]],
    inputs: {
      disabled: [2, "cdkObserveContentDisabled", "disabled", booleanAttribute],
      debounce: "debounce"
    },
    outputs: {
      event: "cdkObserveContent"
    },
    exportAs: ["cdkObserveContent"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(CdkObserveContent, [{
    type: Directive,
    args: [{
      selector: "[cdkObserveContent]",
      exportAs: "cdkObserveContent"
    }]
  }], null, {
    event: [{
      type: Output,
      args: ["cdkObserveContent"]
    }],
    disabled: [{
      type: Input,
      args: [{
        alias: "cdkObserveContentDisabled",
        transform: booleanAttribute
      }]
    }],
    debounce: [{
      type: Input
    }]
  });
})();
var ObserversModule = class _ObserversModule {
  static ɵfac = function ObserversModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ObserversModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _ObserversModule,
    imports: [CdkObserveContent],
    exports: [CdkObserveContent]
  });
  static ɵinj = ɵɵdefineInjector({
    providers: [MutationObserverFactory]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ObserversModule, [{
    type: NgModule,
    args: [{
      imports: [CdkObserveContent],
      exports: [CdkObserveContent],
      providers: [MutationObserverFactory]
    }]
  }], null, null);
})();

// node_modules/ngx-scrollbar/fesm2022/ngx-scrollbar.mjs
var _c0 = ["*"];
var _c1 = "[_nghost-%COMP%]{position:relative;width:100%;height:100%;cursor:default;z-index:1;order:2}";
var _c2 = "[_nghost-%COMP%]{--_thumb-size-percent: var(--_fixed-thumb-size-percent, max(var(--_thumb-size-percent-raw), var(--_min-thumb-size-percent)));--_effective-thumb-ratio: calc(var(--_thumb-size-percent) / 100);--_scrollbar-thumb-transform-to-value: calc((100 / var(--_effective-thumb-ratio) - 100) * 1%);box-sizing:border-box;position:absolute;background:var(--_scrollbar-thumb-color);transition:var(--scrollbar-thumb-transition, none);border-radius:var(--scrollbar-thumb-shape, inherit);will-change:transform;animation-name:_ngcontent-%COMP%_scrollbarThumbAnimation;animation-duration:1ms;animation-timing-function:linear;-webkit-user-select:none;user-select:none}[_nghost-%COMP%]:hover{background:var(--_scrollbar-thumb-hover-color)}[_nghost-%COMP%]:active{background:var(--_scrollbar-thumb-active-color)}@keyframes _ngcontent-%COMP%_scrollbarThumbAnimation{0%{translate:var(--_scrollbar-thumb-transform-from)}to{translate:var(--_scrollbar-thumb-transform-to)}}";
function ScrollbarY_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "button", 2)(1, "button", 3);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ɵɵinterpolate1("ng-scrollbar-button ", ctx_r0.cmp.buttonClass()));
    ɵɵproperty("disabled", !ctx_r0.cmp.isVerticallyScrollable());
    ɵɵadvance();
    ɵɵclassMap(ɵɵinterpolate1("ng-scrollbar-button ", ctx_r0.cmp.buttonClass()));
    ɵɵproperty("disabled", !ctx_r0.cmp.isVerticallyScrollable());
  }
}
function ScrollbarX_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "button", 2)(1, "button", 3);
  }
  if (rf & 2) {
    const ctx_r0 = ɵɵnextContext();
    ɵɵclassMap(ɵɵinterpolate1("ng-scrollbar-button ", ctx_r0.cmp.buttonClass()));
    ɵɵproperty("disabled", !ctx_r0.cmp.isHorizontallyScrollable());
    ɵɵadvance();
    ɵɵclassMap(ɵɵinterpolate1("ng-scrollbar-button ", ctx_r0.cmp.buttonClass()));
    ɵɵproperty("disabled", !ctx_r0.cmp.isHorizontallyScrollable());
  }
}
var _c3 = "[_nghost-%COMP%]{display:block;height:var(--_scrollbar-wrapper-height);width:var(--_scrollbar-wrapper-width);position:sticky;z-index:100;opacity:var(--_scrollbar-hover-opacity);transition:var(--_scrollbar-opacity-transition);background:var(--scrollbar-container-color, transparent);border-radius:var(--scrollbar-container-shape, 0px)}.ng-scrollbar-track-wrapper[_ngcontent-%COMP%]{touch-action:none;-webkit-user-select:none;user-select:none;gap:var(--scrollbar-button-gap, 0px);inset-block-start:var(--_scrollbar-track-inset-block-start);inset-block-end:var(--_scrollbar-track-inset-block-end);inset-inline-start:var(--_scrollbar-track-inset-inline-start);inset-inline-end:var(--_scrollbar-track-inset-inline-end);transition:var(--scrollbar-track-wrapper-transition, width 60ms linear, height 60ms linear);position:absolute;overflow:hidden;display:flex;place-items:center}.track-inner[_ngcontent-%COMP%]{position:absolute;border-radius:var(--scrollbar-track-shape, 0);background:var(--scrollbar-track-color, rgba(128, 128, 128, .5))}";
function Scrollbars_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "scrollbar-y");
  }
}
function Scrollbars_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    ɵɵelement(0, "scrollbar-x");
  }
}
var _c4 = '[_nghost-%COMP%]{--_scrollbar-track-thickness-px: var(--scrollbar-track-thickness, 7px);--_scrollbar-container-offset-px: var(--scrollbar-container-offset, 0px);--_scrollbar-total-thickness-px: calc(var(--_scrollbar-track-thickness-px) + var(--_scrollbar-container-offset-px) * 2);--_scrollbar-thumb-min-size: var(--scrollbar-thumb-min-size, 20);position:relative!important;box-sizing:border-box!important;padding:0!important;-webkit-overflow-scrolling:touch;will-change:scroll-position;scrollbar-width:none!important}[_nghost-%COMP%]    >.ng-scroll-spacer{position:absolute;inset-block-start:0;inset-inline-start:0;width:calc(var(--_spacer-width) * 1px);height:calc(var(--_spacer-height) * 1px);min-width:100%;min-height:100%}[_nghost-%COMP%]{--_viewport-overflow: auto;--_scrollbar-content-width: fit-content;overflow:var(--_viewport-overflow)}[orientation=vertical][_nghost-%COMP%]{--_viewport-overflow: hidden auto;--_scrollbar-content-width: unset}[orientation=horizontal][_nghost-%COMP%]{--_viewport-overflow: auto hidden}[_nghost-%COMP%]{--_vertical-inset-block-start: var(--_scrollbar-container-offset-px);--_vertical-inset-block-end: var(--_scrollbar-container-offset-px);--_horizontal-inline-start: var(--_scrollbar-container-offset-px);--_horizontal-inline-end: var(--_scrollbar-container-offset-px);--_scrollbar-grid-template: ". scrollbar-y" 1fr "scrollbar-x ." auto / 1fr auto;--_scrollbar-wrapper-y-start: initial;--_scrollbar-wrapper-y-end: 0;--_scrollbar-wrapper-x-top: initial;--_scrollbar-wrapper-x-bottom: 0}[position=invertY][_nghost-%COMP%]{--_scrollbar-grid-template: "scrollbar-y ." 1fr ". scrollbar-x" auto / auto 1fr}[position=invertX][_nghost-%COMP%]{--_scrollbar-grid-template: "scrollbar-x ." auto ". scrollbar-y" 1fr / 1fr auto}[position=invertAll][_nghost-%COMP%]{--_scrollbar-grid-template: ". scrollbar-x" auto "scrollbar-y ." 1fr / auto 1fr }[_nghost-%COMP%]{--_horizontal-block-start: initial;--_horizontal-block-end: var(--_scrollbar-container-offset-px)}[_nghost-%COMP%]:is([position=invertX],[position=invertAll]){--_horizontal-block-start: var(--_scrollbar-container-offset-px);--_horizontal-block-end: initial;--_scrollbar-wrapper-x-top: 0;--_scrollbar-wrapper-x-bottom: initial}[_nghost-%COMP%]{--_vertical-inset-inline-end: var(--_scrollbar-container-offset-px);--_vertical-inset-inline-start: initial}[_nghost-%COMP%]:is([position=invertY],[position=invertAll]){--_vertical-inset-inline-start: var(--_scrollbar-container-offset-px);--_vertical-inset-inline-end: initial;--_scrollbar-wrapper-y-start: 0;--_scrollbar-wrapper-y-end: initial}[verticalUsed=true][horizontalUsed=true][_nghost-%COMP%]{--_scrollbar-thickness-margin-px: calc(var(--_scrollbar-track-thickness-px) + var(--_scrollbar-container-offset-px) * 3)}[horizontalUsed=true][_nghost-%COMP%]{--_vertical-inset-block-start: var(--_scrollbar-container-offset-px);--_vertical-inset-block-end: var(--_scrollbar-thickness-margin-px)}[horizontalUsed=true][_nghost-%COMP%]:is([position=invertX],[position=invertAll]){--_vertical-inset-block-start: var(--_scrollbar-thickness-margin-px);--_vertical-inset-block-end: var(--_scrollbar-container-offset-px)}[verticalUsed=true][_nghost-%COMP%]{--_horizontal-inline-start: var(--_scrollbar-container-offset-px);--_horizontal-inline-end: var(--_scrollbar-thickness-margin-px)}[verticalUsed=true][_nghost-%COMP%]:is([position=invertY],[position=invertAll]){--_horizontal-inline-start: var(--_scrollbar-thickness-margin-px);--_horizontal-inline-end: var(--_scrollbar-container-offset-px)}[_nghost-%COMP%]{--_viewport-padding-block-start: 0;--_viewport-padding-block-end: 0;--_viewport-padding-inline-start: 0;--_viewport-padding-inline-end: 0}[appearance=native][verticalUsed=true][_nghost-%COMP%]{--_viewport-padding-inline-start: 0;--_viewport-padding-inline-end: var(--_scrollbar-total-thickness-px)}[appearance=native][verticalUsed=true][_nghost-%COMP%]:is([position=invertY],[position=invertAll]){--_viewport-padding-inline-start: var(--_scrollbar-total-thickness-px);--_viewport-padding-inline-end: 0}[appearance=native][horizontalUsed=true][_nghost-%COMP%]{--_viewport-padding-block-start: 0;--_viewport-padding-block-end: var(--_scrollbar-total-thickness-px)}[appearance=native][horizontalUsed=true][_nghost-%COMP%]:is([position=invertX],[position=invertAll]){--_viewport-padding-block-start: var(--_scrollbar-total-thickness-px);--_viewport-padding-block-end: 0}[_nghost-%COMP%]{--_horizontal-thumb-display: block;--_vertical-thumb-display: block}[isVerticallyScrollable=false][_nghost-%COMP%]{--_vertical-thumb-display: none}[isHorizontallyScrollable=false][_nghost-%COMP%]{--_horizontal-thumb-display: none}[visibility=hover][_nghost-%COMP%]{--_scrollbar-hover-opacity: 0;--_scrollbar-opacity-transition: opacity var(--scrollbar-hover-opacity-transition-leave-duration, .4s) var(--scrollbar-hover-opacity-transition-leave-delay, 1s)}[visibility=hover][scrolling=true][_nghost-%COMP%], [visibility=hover][_nghost-%COMP%]:hover, [visibility=hover][_nghost-%COMP%]:active, [visibility=hover][_nghost-%COMP%]:focus{--_scrollbar-hover-opacity: 1;--_scrollbar-opacity-transition: opacity var(--scrollbar-hover-opacity-transition-enter-duration, 0)}[_nghost-%COMP%]{--_viewport_scroll-timeline: unset;--_animation-timeline-y: unset;--_scrollbar-thumb-transform-from: unset;--_scrollbar-thumb-transform-to: unset}[verticalUsed=true][_nghost-%COMP%]{--_timeline-scope: --scrollerY;--_animation-timeline-y: --scrollerY;--_viewport_scroll-timeline: --scrollerY y}[horizontalUsed=true][_nghost-%COMP%]{--_timeline-scope: --scrollerX;--_animation-timeline-x: --scrollerX;--_viewport_scroll-timeline: --scrollerX x}[verticalUsed=true][horizontalUsed=true][_nghost-%COMP%]{--_timeline-scope: --scrollerX, --scrollerY;--_viewport_scroll-timeline: --scrollerX x, --scrollerY y}[_nghost-%COMP%]{scroll-timeline:var(--_viewport_scroll-timeline);--_scrollbar-hover-thickness-px: var(--scrollbar-track-hover-thickness, var(--_scrollbar-track-thickness-px));--_scrollbar-active-thickness-px: var(--scrollbar-track-active-thickness, var(--_scrollbar-hover-thickness-px));--_track-y-thickness-px: var(--_scrollbar-track-thickness-px);--_track-x-thickness-px: var(--_scrollbar-track-thickness-px);-webkit-user-select:var(--_viewport-user-select);user-select:var(--_viewport-user-select)}[dragging=x][_nghost-%COMP%], [dragging=y][_nghost-%COMP%]{--_viewport-user-select: none}[dragging=x][_nghost-%COMP%]{--_track-x-thickness-px: var(--_scrollbar-active-thickness-px)}[dragging=y][_nghost-%COMP%]{--_track-y-thickness-px: var(--_scrollbar-active-thickness-px)}[_nghost-%COMP%]{overscroll-behavior:var(--scrollbar-overscroll-behavior, initial)}[mobile=true][_nghost-%COMP%]{overscroll-behavior:var(--scrollbar-mobile-overscroll-behavior, none)}[_nghost-%COMP%]{--_viewport-pointer-events: auto;--_scrollbar-y-pointer-events: auto;--_scrollbar-x-pointer-events: auto;pointer-events:var(--_viewport-pointer-events)}[disableInteraction=true][_nghost-%COMP%]{--_viewport-pointer-events: none;--_scrollbar-y-pointer-events: none;--_scrollbar-x-pointer-events: none}[isVerticallyScrollable=false][_nghost-%COMP%]{--_scrollbar-y-pointer-events: none}[isHorizontallyScrollable=false][_nghost-%COMP%]{--_scrollbar-x-pointer-events: none}[_nghost-%COMP%]{--_scrollbar-thumb-color: var(--scrollbar-thumb-color, #1e90ff);--_scrollbar-thumb-hover-color: var(--scrollbar-thumb-hover-color, var(--_scrollbar-thumb-color));--_scrollbar-thumb-active-color: var(--scrollbar-thumb-active-color, var(--_scrollbar-thumb-hover-color));--_scrollbar-button-color: var(--scrollbar-button-color, transparent);--_scrollbar-button-hover-color: var(--scrollbar-button-hover-color, var(--_scrollbar-button-color));--_scrollbar-button-active-color: var(--scrollbar-button-active-color, var(--_scrollbar-button-hover-color));--_scrollbar-button-inactive-color: var(--scrollbar-button-inactive-color, color-mix(in srgb, var(--_scrollbar-button-color), #000 35%));--_scrollbar-button-fill: var(--scrollbar-button-fill, var(--_scrollbar-thumb-color));--_scrollbar-button-hover-fill: var(--scrollbar-button-hover-fill, var(--_scrollbar-thumb-hover-color));--_scrollbar-button-active-fill: var(--scrollbar-button-active-fill, var(--_scrollbar-thumb-active-color));--_scrollbar-button-inactive-fill: var(--scrollbar-button-inactive-fill, color-mix(in srgb, var(--_scrollbar-button-fill), #000 35%))}@layer default{[_nghost-%COMP%]{display:block;max-height:100%;max-width:100%}}';
var savedRanges = [];
function saveSelection(doc) {
  const selection = doc.getSelection();
  savedRanges = [];
  if (!selection?.rangeCount) return;
  for (let i = 0; i < selection.rangeCount; i++) {
    savedRanges.push(selection.getRangeAt(i).cloneRange());
  }
}
function restoreSelection(doc) {
  if (!savedRanges?.length) return;
  const selection = doc.getSelection();
  selection.removeAllRanges();
  savedRanges.forEach((range) => selection.addRange(range));
  savedRanges = [];
}
function preventSelection(doc) {
  return tap(() => {
    saveSelection(doc);
    doc.getSelection()?.removeAllRanges();
    doc.onselectstart = () => false;
  });
}
function enableSelection(doc) {
  return tap(() => {
    restoreSelection(doc);
    doc.onselectstart = null;
  });
}
function stopPropagation() {
  return tap((e) => e.stopPropagation());
}
function getThrottledStream(stream, duration) {
  return !duration ? stream : stream.pipe(throttleTime(duration, null, {
    leading: false,
    trailing: true
  }));
}
var ViewportClasses;
(function(ViewportClasses2) {
  ViewportClasses2["Viewport"] = "ng-scroll-viewport";
  ViewportClasses2["Content"] = "ng-scroll-content";
  ViewportClasses2["Spacer"] = "ng-scroll-spacer";
})(ViewportClasses || (ViewportClasses = {}));
var defaultOptions = {
  trackClass: "",
  thumbClass: "",
  buttonClass: "",
  orientation: "auto",
  appearance: "native",
  visibility: "native",
  position: "native",
  trackScrollDuration: 50,
  sensorThrottleTime: 0,
  disableSensor: false,
  disableInteraction: false,
  withButtons: false,
  hoverOffset: false,
  scrollHideDelay: 400,
  scrollThrottleTime: 200
};
var defaultScrollTimelinePolyfill = "https://cdn.jsdelivr.net/gh/MurhafSousli/ngx-scrollbar@19.1.0/projects/ngx-scrollbar/src/assets/scroll-timeline-polyfill.js";
var ScrollbarUpdateReason;
(function(ScrollbarUpdateReason2) {
  ScrollbarUpdateReason2["AfterInit"] = "AfterInit";
  ScrollbarUpdateReason2["Resized"] = "ResizeObserver";
})(ScrollbarUpdateReason || (ScrollbarUpdateReason = {}));
var NG_SCROLLBAR_OPTIONS = new InjectionToken("NG_SCROLLBAR_OPTIONS", {
  providedIn: "root",
  factory: () => defaultOptions
});
var NG_SCROLLBAR_POLYFILL = new InjectionToken("NG_SCROLLBAR_POLYFILL", {
  providedIn: "root",
  factory: () => defaultScrollTimelinePolyfill
});
var ScrollbarInputOutputs = class _ScrollbarInputOutputs {
  /** Global options */
  options = inject(NG_SCROLLBAR_OPTIONS);
  /**
   * Sets the supported scroll track of the viewport, there are 3 options:
   *
   * - `vertical` Use both vertical and horizontal scrollbar
   * - `horizontal` Use both vertical and horizontal scrollbar
   * - `auto` Use both vertical and horizontal scrollbar
   */
  orientation = input(this.options.orientation, ...ngDevMode ? [{
    debugName: "orientation"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * When to show the scrollbar, and there are 3 options:
   *
   * - `native` (default) Scrollbar will be visible when viewport is scrollable like with native scrollbar
   * - `hover` Scrollbars are hidden by default, only visible on scrolling or hovering
   * - `visible` Scrollbars are always visible even if the viewport is not scrollable
   */
  visibility = input(this.options.visibility, ...ngDevMode ? [{
    debugName: "visibility"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /** Show scrollbar buttons */
  withButtons = input(this.options.withButtons, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "withButtons"
  } : (
    /* istanbul ignore next */
    {}
  )), {
    transform: booleanAttribute
  }));
  /** Disables scrollbar interaction like dragging thumb and jumping by track click */
  disableInteraction = input(this.options.disableInteraction, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "disableInteraction"
  } : (
    /* istanbul ignore next */
    {}
  )), {
    transform: booleanAttribute
  }));
  /** Whether ResizeObserver is disabled */
  disableSensor = input(this.options.disableSensor, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "disableSensor"
  } : (
    /* istanbul ignore next */
    {}
  )), {
    transform: booleanAttribute
  }));
  /** Throttle interval for detecting changes via ResizeObserver */
  sensorThrottleTime = input(this.options.sensorThrottleTime, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "sensorThrottleTime"
  } : (
    /* istanbul ignore next */
    {}
  )), {
    transform: numberAttribute
  }));
  /** A flag used to activate hover effect on the offset area around the scrollbar */
  hoverOffset = input(this.options.hoverOffset, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "hoverOffset"
  } : (
    /* istanbul ignore next */
    {}
  )), {
    transform: booleanAttribute
  }));
  /** Scroll duration when the scroll track is clicked */
  trackScrollDuration = input(this.options.trackScrollDuration, __spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "trackScrollDuration"
  } : (
    /* istanbul ignore next */
    {}
  )), {
    transform: numberAttribute
  }));
  /**
   *  Sets the appearance of the scrollbar, there are 2 options:
   *
   * - `native` (default) scrollbar space will be reserved just like with native scrollbar.
   * - `compact` scrollbar doesn't reserve any space, they are placed over the viewport.
   */
  appearance = input(this.options.appearance, ...ngDevMode ? [{
    debugName: "appearance"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Sets the position of each scrollbar, there are 4 options:
   *
   * - `native` (Default) Use the default position like in native scrollbar.
   * - `invertY` Inverts vertical scrollbar position
   * - `invertX` Inverts Horizontal scrollbar position
   * - `invertAll` Inverts both scrollbar positions
   */
  position = input(this.options.position, ...ngDevMode ? [{
    debugName: "position"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /** A class forwarded to the scrollbar track element */
  trackClass = input(this.options.trackClass, ...ngDevMode ? [{
    debugName: "trackClass"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /** A class forwarded to the scrollbar thumb element */
  thumbClass = input(this.options.thumbClass, ...ngDevMode ? [{
    debugName: "thumbClass"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /** A class forwarded to the scrollbar button element */
  buttonClass = input(this.options.thumbClass, ...ngDevMode ? [{
    debugName: "buttonClass"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /** Steam that emits when scrollbar is initialized */
  afterInit = output();
  /** Steam that emits when scrollbar is updated */
  afterUpdate = output();
  static ɵfac = function ScrollbarInputOutputs_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollbarInputOutputs)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _ScrollbarInputOutputs,
    inputs: {
      orientation: [1, "orientation"],
      visibility: [1, "visibility"],
      withButtons: [1, "withButtons"],
      disableInteraction: [1, "disableInteraction"],
      disableSensor: [1, "disableSensor"],
      sensorThrottleTime: [1, "sensorThrottleTime"],
      hoverOffset: [1, "hoverOffset"],
      trackScrollDuration: [1, "trackScrollDuration"],
      appearance: [1, "appearance"],
      position: [1, "position"],
      trackClass: [1, "trackClass"],
      thumbClass: [1, "thumbClass"],
      buttonClass: [1, "buttonClass"]
    },
    outputs: {
      afterInit: "afterInit",
      afterUpdate: "afterUpdate"
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollbarInputOutputs, [{
    type: Directive
  }], null, {
    orientation: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "orientation",
        required: false
      }]
    }],
    visibility: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "visibility",
        required: false
      }]
    }],
    withButtons: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "withButtons",
        required: false
      }]
    }],
    disableInteraction: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "disableInteraction",
        required: false
      }]
    }],
    disableSensor: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "disableSensor",
        required: false
      }]
    }],
    sensorThrottleTime: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "sensorThrottleTime",
        required: false
      }]
    }],
    hoverOffset: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "hoverOffset",
        required: false
      }]
    }],
    trackScrollDuration: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "trackScrollDuration",
        required: false
      }]
    }],
    appearance: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "appearance",
        required: false
      }]
    }],
    position: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "position",
        required: false
      }]
    }],
    trackClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "trackClass",
        required: false
      }]
    }],
    thumbClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "thumbClass",
        required: false
      }]
    }],
    buttonClass: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "buttonClass",
        required: false
      }]
    }],
    afterInit: [{
      type: Output,
      args: ["afterInit"]
    }],
    afterUpdate: [{
      type: Output,
      args: ["afterUpdate"]
    }]
  });
})();
var INITIAL_DIMENSION_VALUE = {
  width: 0,
  height: 0
};
var ViewportAdapter = class _ViewportAdapter extends ScrollbarInputOutputs {
  smoothScroll = inject(SmoothScrollManager);
  /**
   * Indicates if the direction is 'ltr' or 'rtl'
   */
  dir = inject(Directionality);
  /**
   * Indicates when scrollbar thumb is being dragged
   */
  dragging = signal(null, ...ngDevMode ? [{
    debugName: "dragging"
  }] : (
    /* istanbul ignore next */
    []
  ));
  state = computed(() => {
    let verticalUsed = false;
    let horizontalUsed = false;
    let isVerticallyScrollable = false;
    let isHorizontallyScrollable = false;
    const orientation = this.orientation();
    const visibility = this.visibility();
    const viewportDimensions = this.viewportDimension();
    const contentDimensions = this.contentDimension();
    if (orientation === "auto" || orientation === "vertical") {
      isVerticallyScrollable = contentDimensions.height > viewportDimensions.height;
      verticalUsed = visibility === "visible" || isVerticallyScrollable;
    }
    if (orientation === "auto" || orientation === "horizontal") {
      isHorizontallyScrollable = contentDimensions.width > viewportDimensions.width;
      horizontalUsed = visibility === "visible" || isHorizontallyScrollable;
    }
    return {
      verticalUsed,
      horizontalUsed,
      isVerticallyScrollable,
      isHorizontallyScrollable
    };
  }, ...ngDevMode ? [{
    debugName: "state"
  }] : (
    /* istanbul ignore next */
    []
  ));
  isVerticallyScrollable = computed(() => this.state().isVerticallyScrollable, ...ngDevMode ? [{
    debugName: "isVerticallyScrollable"
  }] : (
    /* istanbul ignore next */
    []
  ));
  isHorizontallyScrollable = computed(() => this.state().isHorizontallyScrollable, ...ngDevMode ? [{
    debugName: "isHorizontallyScrollable"
  }] : (
    /* istanbul ignore next */
    []
  ));
  verticalUsed = computed(() => this.state().verticalUsed, ...ngDevMode ? [{
    debugName: "verticalUsed"
  }] : (
    /* istanbul ignore next */
    []
  ));
  horizontalUsed = computed(() => this.state().horizontalUsed, ...ngDevMode ? [{
    debugName: "horizontalUsed"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /** Viewport dimension */
  viewportDimension = signal(INITIAL_DIMENSION_VALUE, ...ngDevMode ? [{
    debugName: "viewportDimension"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /** Content dimension */
  contentDimension = signal(INITIAL_DIMENSION_VALUE, ...ngDevMode ? [{
    debugName: "contentDimension"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Viewport native element
   */
  viewportElement;
  /**
   * The element that wraps the content inside the viewport,
   * used to measure the content size and observe its changes.
   */
  contentWrapperElement;
  /*
   * A signal that indicates when viewport adapter is initialized
   */
  initialized = signal(false, ...ngDevMode ? [{
    debugName: "initialized"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /** Viewport clientHeight */
  get clientHeight() {
    return this.viewportElement.clientHeight;
  }
  /** Viewport clientWidth */
  get clientWidth() {
    return this.viewportElement.clientWidth;
  }
  /** Viewport scrollTop */
  get scrollTop() {
    return this.viewportElement.scrollTop;
  }
  /** Viewport scrollLeft */
  get scrollLeft() {
    return this.viewportElement.scrollLeft;
  }
  /** Content height */
  get contentHeight() {
    return this.contentWrapperElement.clientHeight;
  }
  /** Content width */
  get contentWidth() {
    return this.contentWrapperElement.clientWidth;
  }
  /** The remaining vertical scrollable distance. */
  get scrollMaxX() {
    return this.contentWidth - this.clientWidth;
  }
  /** The vertical remaining scrollable distance */
  get scrollMaxY() {
    return this.contentHeight - this.clientHeight;
  }
  /**
   * Initialize viewport
   */
  init(viewportElement, contentElement, spacerElement) {
    this.viewportElement = viewportElement;
    if (spacerElement) {
      spacerElement.classList.add(ViewportClasses.Spacer);
      this.contentWrapperElement = spacerElement;
    } else {
      this.contentWrapperElement = contentElement;
    }
    this.initialized.set(true);
  }
  reset() {
    this.viewportElement = null;
    this.contentWrapperElement = null;
    this.initialized.set(false);
  }
  /**
   * Scrolls the viewport vertically to the specified value.
   */
  scrollYTo(value) {
    this.viewportElement.scrollTop = value;
  }
  /**
   * Scrolls the viewport horizontally to the specified value.
   */
  scrollXTo(value) {
    this.viewportElement.scrollLeft = value;
  }
  /**
   * Smooth scroll functions
   */
  scrollTo(options) {
    return this.smoothScroll.scrollTo(this.viewportElement, options);
  }
  /**
   * Scroll to an element by reference or selector
   */
  scrollToElement(target, options) {
    return this.smoothScroll.scrollToElement(this.viewportElement, target, options);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵViewportAdapter_BaseFactory;
    return function ViewportAdapter_Factory(__ngFactoryType__) {
      return (ɵViewportAdapter_BaseFactory || (ɵViewportAdapter_BaseFactory = ɵɵgetInheritedFactory(_ViewportAdapter)))(__ngFactoryType__ || _ViewportAdapter);
    };
  })();
  static ɵdir = ɵɵdefineDirective({
    type: _ViewportAdapter,
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ViewportAdapter, [{
    type: Directive
  }], null, null);
})();
var ScrollContent = class _ScrollContent {
  static ɵfac = function ScrollContent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollContent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _ScrollContent,
    selectors: [["ng-scroll-content"]],
    hostVars: 2,
    hostBindings: function ScrollContent_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("ng-scroll-content", true);
      }
    },
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function ScrollContent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    styles: ["[_nghost-%COMP%]{box-sizing:border-box;width:var(--_scrollbar-content-width);z-index:1;min-width:100%;min-height:100%;padding-block-start:var(--_viewport-padding-block-start, 0);padding-block-end:var(--_viewport-padding-block-end, 0);padding-inline-start:var(--_viewport-padding-inline-start, 0);padding-inline-end:var(--_viewport-padding-inline-end, 0)}@layer default{[_nghost-%COMP%]{position:relative}[_nghost-%COMP%]:not(table){display:flow-root}}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollContent, [{
    type: Component,
    args: [{
      host: {
        "[class.ng-scroll-content]": "true"
      },
      selector: "ng-scroll-content",
      template: "<ng-content/>",
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: [":host{box-sizing:border-box;width:var(--_scrollbar-content-width);z-index:1;min-width:100%;min-height:100%;padding-block-start:var(--_viewport-padding-block-start, 0);padding-block-end:var(--_viewport-padding-block-end, 0);padding-inline-start:var(--_viewport-padding-inline-start, 0);padding-inline-end:var(--_viewport-padding-inline-end, 0)}@layer default{:host{position:relative}:host:not(table){display:flow-root}}\n"]
    }]
  }], null, null);
})();
var SCROLLBAR_CONTROL = new InjectionToken("SCROLLBAR_CONTROL");
var ScrollbarAdapter = class _ScrollbarAdapter {
  // Host component reference
  cmp = inject(ViewportAdapter);
  static ɵfac = function ScrollbarAdapter_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollbarAdapter)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _ScrollbarAdapter,
    hostVars: 4,
    hostBindings: function ScrollbarAdapter_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("ng-scrollbar-sticky", true)("ng-scrollbar-hover", ctx.cmp.hoverOffset());
      }
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollbarAdapter, [{
    type: Directive,
    args: [{
      host: {
        "[class.ng-scrollbar-sticky]": "true",
        "[class.ng-scrollbar-hover]": "cmp.hoverOffset()"
      }
    }]
  }], null, null);
})();
var ScrollbarManager = class _ScrollbarManager {
  _polyfillUrl = inject(NG_SCROLLBAR_POLYFILL);
  document = inject(DOCUMENT);
  window = this.document.defaultView;
  scrollTimelinePolyfill = signal(null, ...ngDevMode ? [{
    debugName: "scrollTimelinePolyfill"
  }] : (
    /* istanbul ignore next */
    []
  ));
  constructor() {
    afterNextRender({
      earlyRead: () => {
        if (!this.window["ScrollTimeline"] || !CSS.supports("animation-timeline", "scroll()")) {
          this.initPolyfill();
        }
      }
    });
  }
  async initPolyfill() {
    try {
      const script = this.document.createElement("script");
      script.src = this._polyfillUrl;
      script.async = true;
      await new Promise((resolve, reject) => {
        script.onload = resolve;
        script.onerror = reject;
        this.document.head.appendChild(script);
      });
      if (this.window["ScrollTimeline"]) {
        this.scrollTimelinePolyfill.set(this.window["ScrollTimeline"]);
      } else {
        console.error("[NgScrollbar]: Polyfill script loaded but ScrollTimeline not found.");
      }
    } catch (error) {
      console.error("[NgScrollbar]: Error loading ScrollTimeline script:", error);
    }
  }
  static ɵfac = function ScrollbarManager_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollbarManager)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _ScrollbarManager,
    factory: _ScrollbarManager.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollbarManager, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], () => [], null);
})();
var PointerEventsAdapter = class {
  // Reference to the ScrollViewport component
  adapter = inject(ViewportAdapter);
  // Reference to the Scrollbar control component
  control = inject(SCROLLBAR_CONTROL);
  // Reference to the Document element
  document = inject(DOCUMENT);
  // The native element of the directive
  nativeElement = inject(ElementRef).nativeElement;
  // Pointer events subscription (made public for testing purpose)
  _pointerEventsSub;
  constructor() {
    effect((onCleanup) => {
      const disableInteraction = this.adapter.disableInteraction();
      untracked(() => {
        if (!disableInteraction) {
          this._pointerEventsSub = this.pointerEvents.subscribe();
        }
        onCleanup(() => this._pointerEventsSub?.unsubscribe());
      });
    });
  }
};
var TrackAdapter = class _TrackAdapter extends PointerEventsAdapter {
  pointerOut$ = fromEvent(this.nativeElement, "pointerout", {
    passive: true
  });
  // The current position of the mouse during track dragging
  currMousePosition;
  // The direction of scroll when the track area is clicked
  scrollDirection;
  // The maximum scroll position until the end is reached
  scrollMax;
  // Returns viewport client size
  get viewportSize() {
    return this.adapter[this.control.sizeProperty];
  }
  // Get track client rect
  get clientRect() {
    return this.nativeElement.getBoundingClientRect();
  }
  // Scrollbar track offset
  get offset() {
    return this.clientRect[this.control.rectOffsetProperty];
  }
  // Scrollbar track length
  get size() {
    return this.nativeElement[this.control.sizeProperty];
  }
  // Observable for track dragging events
  get pointerEvents() {
    const pointerDown$ = fromEvent(this.nativeElement, "pointerdown").pipe(stopPropagation(), preventSelection(this.document));
    const pointerUp$ = fromEvent(this.document, "pointerup", {
      passive: true
    }).pipe(enableSelection(this.document));
    const pointerOver$ = fromEvent(this.nativeElement, "pointerover", {
      passive: true
    }).pipe(
      // When the mouse is out and enters again, must set the current position first
      tap((e) => this.currMousePosition = this.getPointerPosition(e)),
      startWith({})
    );
    const pointerMove$ = fromEvent(this.nativeElement, "pointermove", {
      passive: true
    }).pipe(tap((e) => this.currMousePosition = this.getPointerPosition(e)));
    return pointerDown$.pipe(switchMap((startEvent) => {
      pointerMove$.pipe(takeUntil(pointerUp$)).subscribe();
      return this.onTrackFirstClick(startEvent).pipe(delay(200), switchMap(() => {
        return pointerOver$.pipe(filter(() => this.scrollDirection === this.getScrollDirection(this.currMousePosition)), switchMap(() => this.onTrackOngoingMousedown()));
      }), takeUntil(pointerUp$));
    }));
  }
  constructor() {
    super();
  }
  getPointerPosition(e) {
    return e[this.control.clientProperty] - this.offset;
  }
  /**
   *  Callback when mouse is first clicked on the track
   */
  onTrackFirstClick(e) {
    this.currMousePosition = this.getPointerPosition(e);
    this.scrollDirection = this.getScrollDirection(this.currMousePosition);
    this.scrollMax = this.control.viewportScrollMax;
    return this.scrollTo(this.nextStep());
  }
  nextStep() {
    if (this.scrollDirection === "forward") {
      const scrollForwardIncrement = this.getScrollForwardStep();
      if (scrollForwardIncrement >= this.scrollMax) {
        return this.scrollMax;
      }
      return scrollForwardIncrement;
    }
    const scrollBackwardIncrement = this.getScrollBackwardStep();
    if (scrollBackwardIncrement <= 0) {
      return 0;
    }
    return scrollBackwardIncrement;
  }
  /**
   * Callback when mouse is still down on the track
   * Incrementally scrolls towards target position until reached
   */
  onTrackOngoingMousedown() {
    const position = this.nextStep();
    return this.scrollTo(position).pipe(
      // If mouse left the track, terminate the stream
      takeUntil(this.pointerOut$),
      // Keep scrolling until target position is reached
      takeWhile(() => !this.isReachedByOffset()),
      switchMap(() => this.onTrackOngoingMousedown())
    );
  }
  /**
   * Returns a flag that determines whether the viewport has reached the end boundary
   */
  isReachedByOffset() {
    if (this.scrollDirection === "forward") {
      return this.control.viewportScrollOffset >= this.scrollMax;
    }
    return this.control.viewportScrollOffset <= 0;
  }
  static ɵfac = function TrackAdapter_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TrackAdapter)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _TrackAdapter,
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrackAdapter, [{
    type: Directive
  }], () => [], null);
})();
var TrackYComponent = class _TrackYComponent extends TrackAdapter {
  get contentSize() {
    return this.adapter.contentHeight;
  }
  getThumbStartPosition() {
    return this.control.viewportScrollOffset * this.size / this.contentSize;
  }
  getThumbEndPosition() {
    return (this.control.viewportScrollOffset + this.viewportSize) * this.size / this.contentSize;
  }
  getScrollDirection(position) {
    if (position > this.getThumbEndPosition()) {
      return "forward";
    } else if (position < this.getThumbStartPosition()) {
      return "backward";
    }
    return null;
  }
  scrollTo(top) {
    return from(this.adapter.scrollTo({
      top,
      duration: this.adapter.trackScrollDuration()
    }));
  }
  getScrollForwardStep() {
    return this.control.viewportScrollOffset + this.viewportSize;
  }
  getScrollBackwardStep() {
    return this.control.viewportScrollOffset - this.viewportSize;
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵTrackYComponent_BaseFactory;
    return function TrackYComponent_Factory(__ngFactoryType__) {
      return (ɵTrackYComponent_BaseFactory || (ɵTrackYComponent_BaseFactory = ɵɵgetInheritedFactory(_TrackYComponent)))(__ngFactoryType__ || _TrackYComponent);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _TrackYComponent,
    selectors: [["scrollbar-track-y"]],
    features: [ɵɵProvidersFeature([{
      provide: TrackAdapter,
      useExisting: _TrackYComponent
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function TrackYComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    styles: ["[_nghost-%COMP%]{position:relative;width:100%;height:100%;cursor:default;z-index:1;order:2}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrackYComponent, [{
    type: Component,
    args: [{
      selector: "scrollbar-track-y",
      template: "<ng-content/>",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: TrackAdapter,
        useExisting: TrackYComponent
      }],
      styles: [":host{position:relative;width:100%;height:100%;cursor:default;z-index:1;order:2}\n"]
    }]
  }], null, null);
})();
var TrackXComponent = class _TrackXComponent extends TrackAdapter {
  get contentSize() {
    return this.adapter.contentWidth;
  }
  getThumbStartPosition;
  getThumbEndPosition;
  getScrollDirection;
  constructor() {
    effect(() => {
      if (this.adapter.dir.valueSignal() === "rtl") {
        this.getThumbStartPosition = () => {
          const offset = this.contentSize - this.viewportSize - this.control.viewportScrollOffset;
          return offset * this.size / this.contentSize;
        };
        this.getThumbEndPosition = () => {
          const offset = this.contentSize - this.control.viewportScrollOffset;
          return offset * this.size / this.contentSize;
        };
        this.getScrollDirection = (position) => {
          if (position < this.getThumbStartPosition()) {
            return "forward";
          } else if (position > this.getThumbEndPosition()) {
            return "backward";
          }
          return null;
        };
      } else {
        this.getThumbStartPosition = () => {
          return this.control.viewportScrollOffset * this.size / this.contentSize;
        };
        this.getThumbEndPosition = () => {
          return (this.control.viewportScrollOffset + this.viewportSize) * this.size / this.contentSize;
        };
        this.getScrollDirection = (position) => {
          if (position > this.getThumbEndPosition()) {
            return "forward";
          } else if (position < this.getThumbStartPosition()) {
            return "backward";
          }
          return null;
        };
      }
    });
    super();
  }
  scrollTo(start) {
    return from(this.adapter.scrollTo({
      start,
      duration: this.adapter.trackScrollDuration()
    }));
  }
  getScrollForwardStep() {
    return this.control.viewportScrollOffset + this.viewportSize;
  }
  getScrollBackwardStep() {
    return this.control.viewportScrollOffset - this.viewportSize;
  }
  static ɵfac = function TrackXComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TrackXComponent)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _TrackXComponent,
    selectors: [["scrollbar-track-x"]],
    features: [ɵɵProvidersFeature([{
      provide: TrackAdapter,
      useExisting: _TrackXComponent
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function TrackXComponent_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    styles: [_c1]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(TrackXComponent, [{
    type: Component,
    args: [{
      selector: "scrollbar-track-x",
      template: "<ng-content/>",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: TrackAdapter,
        useExisting: TrackXComponent
      }],
      styles: [":host{position:relative;width:100%;height:100%;cursor:default;z-index:1;order:2}\n"]
    }]
  }], () => [], null);
})();
var ThumbAdapter = class _ThumbAdapter extends PointerEventsAdapter {
  manager = inject(ScrollbarManager);
  track = inject(TrackAdapter);
  // The animation reference used for enabling the polyfill in Firefox.
  _animation;
  // Returns thumb size
  get size() {
    return this.nativeElement.getBoundingClientRect()[this.control.rectSizeProperty];
  }
  // The maximum space available for scrolling.
  get trackMax() {
    return this.track.size - this.size;
  }
  /**
   * Stream that emits the 'scrollTo' position when a scrollbar thumb element is dragged
   * This function is called by thumb drag event using viewport or scrollbar pointer events
   */
  get pointerEvents() {
    return fromEvent(this.nativeElement, "pointerdown").pipe(stopPropagation(), preventSelection(this.document), switchMap((e) => {
      let startTrackMax;
      let startScrollMax;
      const dragStart = of(e).pipe(tap(() => {
        startTrackMax = this.trackMax;
        startScrollMax = this.control.viewportScrollMax;
        this.adapter.dragging.set(this.control.axis);
      }));
      const dragging = fromEvent(this.document, "pointermove").pipe(stopPropagation());
      const dragEnd = fromEvent(this.document, "pointerup", {
        capture: true
      }).pipe(stopPropagation(), enableSelection(this.document), tap(() => this.adapter.dragging.set(null)));
      return dragStart.pipe(map((startEvent) => startEvent[this.control.offsetProperty]), switchMap((startOffset) => dragging.pipe(
        map((moveEvent) => moveEvent[this.control.clientProperty]),
        // Calculate how far the pointer is from the top/left of the scrollbar (minus the dragOffset).
        map((moveClient) => moveClient - this.track.offset),
        map((trackRelativeOffset) => startScrollMax * (trackRelativeOffset - startOffset) / startTrackMax),
        tap((scrollPosition) => this.control.instantScrollTo(scrollPosition, startScrollMax)),
        takeUntil(dragEnd)
      )));
    }));
  }
  constructor() {
    afterRenderEffect({
      earlyRead: () => {
        const script = this.manager.scrollTimelinePolyfill();
        untracked(() => {
          if (script && !this._animation) {
            this._animation = startPolyfill(script, this.nativeElement, this.adapter.viewportElement, this.control.axis);
          }
        });
      }
    });
    super();
  }
  static ɵfac = function ThumbAdapter_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ThumbAdapter)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _ThumbAdapter,
    features: [ɵɵInheritDefinitionFeature]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThumbAdapter, [{
    type: Directive
  }], () => [], null);
})();
function startPolyfill(ScrollTimeline, element, source, axis) {
  return element.animate({
    translate: ["var(--_scrollbar-thumb-transform-from)", "var(--_scrollbar-thumb-transform-to)"]
  }, {
    fill: "both",
    easing: "linear",
    timeline: new ScrollTimeline({
      source,
      axis
    })
  });
}
var ThumbYComponent = class _ThumbYComponent extends ThumbAdapter {
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵThumbYComponent_BaseFactory;
    return function ThumbYComponent_Factory(__ngFactoryType__) {
      return (ɵThumbYComponent_BaseFactory || (ɵThumbYComponent_BaseFactory = ɵɵgetInheritedFactory(_ThumbYComponent)))(__ngFactoryType__ || _ThumbYComponent);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _ThumbYComponent,
    selectors: [["scrollbar-thumb-y"]],
    features: [ɵɵProvidersFeature([{
      provide: ThumbAdapter,
      useExisting: _ThumbYComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function ThumbYComponent_Template(rf, ctx) {
    },
    styles: ["[_nghost-%COMP%]{--_thumb-size-percent: var(--_fixed-thumb-size-percent, max(var(--_thumb-size-percent-raw), var(--_min-thumb-size-percent)));--_effective-thumb-ratio: calc(var(--_thumb-size-percent) / 100);--_scrollbar-thumb-transform-to-value: calc((100 / var(--_effective-thumb-ratio) - 100) * 1%);box-sizing:border-box;position:absolute;background:var(--_scrollbar-thumb-color);transition:var(--scrollbar-thumb-transition, none);border-radius:var(--scrollbar-thumb-shape, inherit);will-change:transform;animation-name:_ngcontent-%COMP%_scrollbarThumbAnimation;animation-duration:1ms;animation-timing-function:linear;-webkit-user-select:none;user-select:none}[_nghost-%COMP%]:hover{background:var(--_scrollbar-thumb-hover-color)}[_nghost-%COMP%]:active{background:var(--_scrollbar-thumb-active-color)}@keyframes _ngcontent-%COMP%_scrollbarThumbAnimation{0%{translate:var(--_scrollbar-thumb-transform-from)}to{translate:var(--_scrollbar-thumb-transform-to)}}", "[_nghost-%COMP%]{animation-timeline:var(--_animation-timeline-y);display:var(--_vertical-thumb-display);height:calc(var(--_thumb-size-percent) * 1%);width:100%;--_thumb-size-percent-raw: calc(var(--viewport-height) / var(--content-height) * 100);--_min-thumb-size-percent: calc(var(--_scrollbar-thumb-min-size) / var(--viewport-height) * 100);--_fixed-thumb-size-percent: calc(var(--scrollbar-thumb-size) / var(--viewport-height) * 100);--_scrollbar-thumb-transform-from: 0 0;--_scrollbar-thumb-transform-to: 0 var(--_scrollbar-thumb-transform-to-value)}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThumbYComponent, [{
    type: Component,
    args: [{
      selector: "scrollbar-thumb-y",
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: ThumbAdapter,
        useExisting: ThumbYComponent
      }],
      styles: [":host{--_thumb-size-percent: var(--_fixed-thumb-size-percent, max(var(--_thumb-size-percent-raw), var(--_min-thumb-size-percent)));--_effective-thumb-ratio: calc(var(--_thumb-size-percent) / 100);--_scrollbar-thumb-transform-to-value: calc((100 / var(--_effective-thumb-ratio) - 100) * 1%);box-sizing:border-box;position:absolute;background:var(--_scrollbar-thumb-color);transition:var(--scrollbar-thumb-transition, none);border-radius:var(--scrollbar-thumb-shape, inherit);will-change:transform;animation-name:scrollbarThumbAnimation;animation-duration:1ms;animation-timing-function:linear;-webkit-user-select:none;user-select:none}:host:hover{background:var(--_scrollbar-thumb-hover-color)}:host:active{background:var(--_scrollbar-thumb-active-color)}@keyframes scrollbarThumbAnimation{0%{translate:var(--_scrollbar-thumb-transform-from)}to{translate:var(--_scrollbar-thumb-transform-to)}}\n", ":host{animation-timeline:var(--_animation-timeline-y);display:var(--_vertical-thumb-display);height:calc(var(--_thumb-size-percent) * 1%);width:100%;--_thumb-size-percent-raw: calc(var(--viewport-height) / var(--content-height) * 100);--_min-thumb-size-percent: calc(var(--_scrollbar-thumb-min-size) / var(--viewport-height) * 100);--_fixed-thumb-size-percent: calc(var(--scrollbar-thumb-size) / var(--viewport-height) * 100);--_scrollbar-thumb-transform-from: 0 0;--_scrollbar-thumb-transform-to: 0 var(--_scrollbar-thumb-transform-to-value)}\n"]
    }]
  }], null, null);
})();
var ThumbXComponent = class _ThumbXComponent extends ThumbAdapter {
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵThumbXComponent_BaseFactory;
    return function ThumbXComponent_Factory(__ngFactoryType__) {
      return (ɵThumbXComponent_BaseFactory || (ɵThumbXComponent_BaseFactory = ɵɵgetInheritedFactory(_ThumbXComponent)))(__ngFactoryType__ || _ThumbXComponent);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _ThumbXComponent,
    selectors: [["scrollbar-thumb-x"]],
    features: [ɵɵProvidersFeature([{
      provide: ThumbAdapter,
      useExisting: _ThumbXComponent
    }]), ɵɵInheritDefinitionFeature],
    decls: 0,
    vars: 0,
    template: function ThumbXComponent_Template(rf, ctx) {
    },
    styles: [_c2, "[_nghost-%COMP%]{animation-timeline:var(--_animation-timeline-x);display:var(--_horizontal-thumb-display);height:100%;width:calc(var(--_thumb-size-percent) * 1%);--_thumb-size-percent-raw: calc(var(--viewport-width) / var(--content-width) * 100);--_min-thumb-size-percent: calc(var(--_scrollbar-thumb-min-size) / var(--viewport-width) * 100);--_fixed-thumb-size-percent: calc(var(--scrollbar-thumb-size) / var(--viewport-width) * 100);--_scrollbar-thumb-transform-from: 0;--_scrollbar-thumb-transform-to: var(--_scrollbar-thumb-transform-to-value)}[dir=rtl][_nghost-%COMP%]{animation-name:_ngcontent-%COMP%_scrollbarThumbRTLAnimation;will-change:right;--_scrollbar-thumb-transform-to: calc(var(--_scrollbar-thumb-transform-to-value) * -1)}@keyframes _ngcontent-%COMP%_scrollbarThumbRTLAnimation{0%{right:var(--_scrollbar-thumb-transform-from)}to{right:calc((var(--_effective-thumb-ratio) - 100 + var(--_effective-thumb-ratio) * 100) * -1%)}}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ThumbXComponent, [{
    type: Component,
    args: [{
      selector: "scrollbar-thumb-x",
      template: "",
      changeDetection: ChangeDetectionStrategy.OnPush,
      providers: [{
        provide: ThumbAdapter,
        useExisting: ThumbXComponent
      }],
      styles: [":host{--_thumb-size-percent: var(--_fixed-thumb-size-percent, max(var(--_thumb-size-percent-raw), var(--_min-thumb-size-percent)));--_effective-thumb-ratio: calc(var(--_thumb-size-percent) / 100);--_scrollbar-thumb-transform-to-value: calc((100 / var(--_effective-thumb-ratio) - 100) * 1%);box-sizing:border-box;position:absolute;background:var(--_scrollbar-thumb-color);transition:var(--scrollbar-thumb-transition, none);border-radius:var(--scrollbar-thumb-shape, inherit);will-change:transform;animation-name:scrollbarThumbAnimation;animation-duration:1ms;animation-timing-function:linear;-webkit-user-select:none;user-select:none}:host:hover{background:var(--_scrollbar-thumb-hover-color)}:host:active{background:var(--_scrollbar-thumb-active-color)}@keyframes scrollbarThumbAnimation{0%{translate:var(--_scrollbar-thumb-transform-from)}to{translate:var(--_scrollbar-thumb-transform-to)}}\n", ":host{animation-timeline:var(--_animation-timeline-x);display:var(--_horizontal-thumb-display);height:100%;width:calc(var(--_thumb-size-percent) * 1%);--_thumb-size-percent-raw: calc(var(--viewport-width) / var(--content-width) * 100);--_min-thumb-size-percent: calc(var(--_scrollbar-thumb-min-size) / var(--viewport-width) * 100);--_fixed-thumb-size-percent: calc(var(--scrollbar-thumb-size) / var(--viewport-width) * 100);--_scrollbar-thumb-transform-from: 0;--_scrollbar-thumb-transform-to: var(--_scrollbar-thumb-transform-to-value)}:host[dir=rtl]{animation-name:scrollbarThumbRTLAnimation;will-change:right;--_scrollbar-thumb-transform-to: calc(var(--_scrollbar-thumb-transform-to-value) * -1)}@keyframes scrollbarThumbRTLAnimation{0%{right:var(--_scrollbar-thumb-transform-from)}to{right:calc((var(--_effective-thumb-ratio) - 100 + var(--_effective-thumb-ratio) * 100) * -1%)}}\n"]
    }]
  }], null, null);
})();
var canScrollFunc = {
  forward: (scrollOffset, scrollMax) => scrollOffset < scrollMax,
  backward: (scrollOffset) => scrollOffset > 0
};
var scrollStepFunc = {
  forward: (scrollBy, offset) => offset + scrollBy,
  backward: (scrollBy, offset) => offset - scrollBy
};
var horizontalScrollStepFunc = {
  rtl: {
    forward: (scrollBy, offset, scrollMax) => scrollMax - offset - scrollBy,
    backward: (scrollBy, offset, scrollMax) => scrollMax - offset + scrollBy
  },
  ltr: scrollStepFunc
};
var ScrollbarButton = class _ScrollbarButton extends PointerEventsAdapter {
  scrollbarButton = input.required(...ngDevMode ? [{
    debugName: "scrollbarButton"
  }] : (
    /* istanbul ignore next */
    []
  ));
  scrollDirection = input.required(...ngDevMode ? [{
    debugName: "scrollDirection"
  }] : (
    /* istanbul ignore next */
    []
  ));
  afterFirstClickDelay = 120;
  firstClickDuration = 100;
  scrollBy = 50;
  onGoingScrollBy = 12;
  nextStep;
  canScroll;
  get pointerEvents() {
    const pointerDown$ = fromEvent(this.nativeElement, "pointerdown").pipe(stopPropagation(), preventSelection(this.document));
    const pointerUp$ = fromEvent(this.document, "pointerup", {
      passive: true
    }).pipe(enableSelection(this.document));
    const pointerLeave$ = fromEvent(this.nativeElement, "pointerleave", {
      passive: true
    });
    const pointerUpOrLeave$ = merge(pointerUp$, pointerLeave$);
    return pointerDown$.pipe(switchMap(() => this.firstScrollStep().pipe(delay(this.afterFirstClickDelay), switchMap(() => this.onOngoingPointerdown()), takeUntil(pointerUpOrLeave$))));
  }
  constructor() {
    effect(() => {
      const scrollDirection = this.scrollDirection();
      const dir = this.adapter.dir.valueSignal();
      untracked(() => {
        this.canScroll = canScrollFunc[scrollDirection];
        if (this.control.axis === "x") {
          this.nextStep = horizontalScrollStepFunc[dir][scrollDirection];
        } else {
          this.nextStep = scrollStepFunc[scrollDirection];
        }
      });
    });
    super();
  }
  firstScrollStep() {
    const value = this.nextStep(this.scrollBy, this.control.viewportScrollOffset, this.control.viewportScrollMax);
    return this.control.scrollTo(value, this.firstClickDuration);
  }
  onGoingScrollStep() {
    const scrollMax = this.control.viewportScrollMax;
    const value = this.nextStep(this.onGoingScrollBy, this.control.viewportScrollOffset, scrollMax);
    this.control.instantScrollTo(value, scrollMax);
  }
  onOngoingPointerdown() {
    return interval(0, animationFrameScheduler).pipe(takeWhile(() => this.canScroll(this.control.viewportScrollOffset, this.control.viewportScrollMax)), tap(() => this.onGoingScrollStep()));
  }
  static ɵfac = function ScrollbarButton_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollbarButton)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _ScrollbarButton,
    selectors: [["button", "scrollbarButton", ""]],
    inputs: {
      scrollbarButton: [1, "scrollbarButton"],
      scrollDirection: [1, "scrollDirection"]
    },
    features: [ɵɵInheritDefinitionFeature],
    decls: 3,
    vars: 0,
    consts: [[1, "ng-scrollbar-button-icon"], ["viewBox", "0 0 512 512", "xmlns", "http://www.w3.org/2000/svg"], ["d", "M413.1,327.3l-1.8-2.1l-136-156.5c-4.6-5.3-11.5-8.6-19.2-8.6c-7.7,0-14.6,3.4-19.2,8.6L101,324.9l-2.3,2.6  C97,330,96,333,96,336.2c0,8.7,7.4,15.8,16.6,15.8v0h286.8v0c9.2,0,16.6-7.1,16.6-15.8C416,332.9,414.9,329.8,413.1,327.3z"]],
    template: function ScrollbarButton_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵdomElementStart(0, "div", 0);
        ɵɵnamespaceSVG();
        ɵɵdomElementStart(1, "svg", 1);
        ɵɵdomElement(2, "path", 2);
        ɵɵdomElementEnd()();
      }
    },
    styles: ["[_nghost-%COMP%]{position:relative;border:none;margin:0;padding:0;border-radius:var(--scrollbar-button-shape);appearance:none;background:var(--_scrollbar-button-color);flex:0 0 var(--scrollbar-button-size, var(--_scrollbar-track-thickness-px));block-size:100%}[_nghost-%COMP%]   svg[_ngcontent-%COMP%]{width:100%;height:100%;fill:var(--_scrollbar-button-fill)}[_nghost-%COMP%]:hover{background:var(--_scrollbar-button-hover-color)}[_nghost-%COMP%]:hover   svg[_ngcontent-%COMP%]{fill:var(--_scrollbar-button-hover-fill)}[_nghost-%COMP%]:active{background:var(--_scrollbar-button-active-color)}[_nghost-%COMP%]:active   svg[_ngcontent-%COMP%]{fill:var(--_scrollbar-button-active-fill)}[_nghost-%COMP%]:disabled{background:var(--_scrollbar-button-inactive-color)}[_nghost-%COMP%]:disabled   svg[_ngcontent-%COMP%]{fill:var(--_scrollbar-button-inactive-fill)}[scrollbarButton=top][_nghost-%COMP%]{--_button-rotate: var(--_button-icon-rotate-top)}[scrollbarButton=bottom][_nghost-%COMP%]{--_button-rotate: var(--_button-icon-rotate-bottom)}[scrollbarButton=start][_nghost-%COMP%]{--_button-rotate: var(--_button-icon-rotate-start)}[scrollbarButton=end][_nghost-%COMP%]{--_button-rotate: var(--_button-icon-rotate-end)}[_nghost-%COMP%]:is([scrollbarButton=top],[scrollbarButton=start]){order:1}[_nghost-%COMP%]:is([scrollbarButton=bottom],[scrollbarButton=end]){order:3}.ng-scrollbar-button-icon[_ngcontent-%COMP%]{rotate:var(--_button-rotate);display:flex;place-content:center;place-items:center;width:100%;height:100%}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollbarButton, [{
    type: Component,
    args: [{
      selector: "button[scrollbarButton]",
      changeDetection: ChangeDetectionStrategy.OnPush,
      template: '<div class="ng-scrollbar-button-icon">\r\n  <svg viewBox="0 0 512 512"\r\n       xmlns="http://www.w3.org/2000/svg">\r\n    <path\r\n      d="M413.1,327.3l-1.8-2.1l-136-156.5c-4.6-5.3-11.5-8.6-19.2-8.6c-7.7,0-14.6,3.4-19.2,8.6L101,324.9l-2.3,2.6  C97,330,96,333,96,336.2c0,8.7,7.4,15.8,16.6,15.8v0h286.8v0c9.2,0,16.6-7.1,16.6-15.8C416,332.9,414.9,329.8,413.1,327.3z"/>\r\n  </svg>\r\n</div>\r\n',
      styles: [":host{position:relative;border:none;margin:0;padding:0;border-radius:var(--scrollbar-button-shape);appearance:none;background:var(--_scrollbar-button-color);flex:0 0 var(--scrollbar-button-size, var(--_scrollbar-track-thickness-px));block-size:100%}:host svg{width:100%;height:100%;fill:var(--_scrollbar-button-fill)}:host:hover{background:var(--_scrollbar-button-hover-color)}:host:hover svg{fill:var(--_scrollbar-button-hover-fill)}:host:active{background:var(--_scrollbar-button-active-color)}:host:active svg{fill:var(--_scrollbar-button-active-fill)}:host:disabled{background:var(--_scrollbar-button-inactive-color)}:host:disabled svg{fill:var(--_scrollbar-button-inactive-fill)}:host[scrollbarButton=top]{--_button-rotate: var(--_button-icon-rotate-top)}:host[scrollbarButton=bottom]{--_button-rotate: var(--_button-icon-rotate-bottom)}:host[scrollbarButton=start]{--_button-rotate: var(--_button-icon-rotate-start)}:host[scrollbarButton=end]{--_button-rotate: var(--_button-icon-rotate-end)}:host:is([scrollbarButton=top],[scrollbarButton=start]){order:1}:host:is([scrollbarButton=bottom],[scrollbarButton=end]){order:3}.ng-scrollbar-button-icon{rotate:var(--_button-rotate);display:flex;place-content:center;place-items:center;width:100%;height:100%}\n"]
    }]
  }], () => [], {
    scrollbarButton: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "scrollbarButton",
        required: true
      }]
    }],
    scrollDirection: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "scrollDirection",
        required: true
      }]
    }]
  });
})();
var ScrollbarY = class _ScrollbarY extends ScrollbarAdapter {
  rectOffsetProperty = "top";
  rectSizeProperty = "height";
  sizeProperty = "clientHeight";
  clientProperty = "clientY";
  offsetProperty = "offsetY";
  axis = "y";
  get viewportScrollMax() {
    return this.cmp.scrollMaxY;
  }
  get viewportScrollOffset() {
    return this.cmp.scrollTop;
  }
  scrollTo(top, duration) {
    return from(this.cmp.scrollTo({
      top,
      duration
    }));
  }
  instantScrollTo(value) {
    this.cmp.scrollYTo(value);
  }
  static ɵfac = /* @__PURE__ */ (() => {
    let ɵScrollbarY_BaseFactory;
    return function ScrollbarY_Factory(__ngFactoryType__) {
      return (ɵScrollbarY_BaseFactory || (ɵScrollbarY_BaseFactory = ɵɵgetInheritedFactory(_ScrollbarY)))(__ngFactoryType__ || _ScrollbarY);
    };
  })();
  static ɵcmp = ɵɵdefineComponent({
    type: _ScrollbarY,
    selectors: [["scrollbar-y"]],
    features: [ɵɵProvidersFeature([{
      provide: SCROLLBAR_CONTROL,
      useExisting: _ScrollbarY
    }]), ɵɵInheritDefinitionFeature],
    decls: 5,
    vars: 9,
    consts: [[1, "ng-scrollbar-track-wrapper"], [1, "track-inner"], ["scrollbarButton", "top", "scrollDirection", "backward", 3, "disabled"], ["scrollbarButton", "bottom", "scrollDirection", "forward", 3, "disabled"]],
    template: function ScrollbarY_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 0)(1, "scrollbar-track-y")(2, "div", 1);
        ɵɵelement(3, "scrollbar-thumb-y");
        ɵɵelementEnd()();
        ɵɵconditionalCreate(4, ScrollbarY_Conditional_4_Template, 2, 8);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassProp("ng-scrollbar-hover", !ctx.cmp.hoverOffset());
        ɵɵadvance();
        ɵɵclassMap(ɵɵinterpolate1("ng-scrollbar-track ", ctx.cmp.trackClass()));
        ɵɵadvance(2);
        ɵɵclassMap(ɵɵinterpolate1("ng-scrollbar-thumb ", ctx.cmp.thumbClass()));
        ɵɵadvance();
        ɵɵconditional(ctx.cmp.withButtons() ? 4 : -1);
      }
    },
    dependencies: [TrackYComponent, ThumbYComponent, ScrollbarButton],
    styles: ["[_nghost-%COMP%]{display:block;height:var(--_scrollbar-wrapper-height);width:var(--_scrollbar-wrapper-width);position:sticky;z-index:100;opacity:var(--_scrollbar-hover-opacity);transition:var(--_scrollbar-opacity-transition);background:var(--scrollbar-container-color, transparent);border-radius:var(--scrollbar-container-shape, 0px)}.ng-scrollbar-track-wrapper[_ngcontent-%COMP%]{touch-action:none;-webkit-user-select:none;user-select:none;gap:var(--scrollbar-button-gap, 0px);inset-block-start:var(--_scrollbar-track-inset-block-start);inset-block-end:var(--_scrollbar-track-inset-block-end);inset-inline-start:var(--_scrollbar-track-inset-inline-start);inset-inline-end:var(--_scrollbar-track-inset-inline-end);transition:var(--scrollbar-track-wrapper-transition, width 60ms linear, height 60ms linear);position:absolute;overflow:hidden;display:flex;place-items:center}.track-inner[_ngcontent-%COMP%]{position:absolute;border-radius:var(--scrollbar-track-shape, 0);background:var(--scrollbar-track-color, rgba(128, 128, 128, .5))}", "[_nghost-%COMP%]{--_scrollbar-wrapper-height: calc(var(--viewport-height) * 1px);--_scrollbar-wrapper-width: var(--_scrollbar-total-thickness-px);--_scrollbar-track-inset-block-start: var(--_vertical-inset-block-start);--_scrollbar-track-inset-block-end: var(--_vertical-inset-block-end);--_scrollbar-track-inset-inline-end: var(--_vertical-inset-inline-end);--_scrollbar-track-inset-inline-start: var(--_vertical-inset-inline-start);--_button-icon-rotate-top: 0deg;--_button-icon-rotate-bottom: 180deg;grid-area:scrollbar-y;pointer-events:var(--_scrollbar-y-pointer-events);inset-block-start:0;inset-block-end:0;inset-inline-start:var(--_scrollbar-wrapper-y-start);inset-inline-end:var(--_scrollbar-wrapper-y-end)}.ng-scrollbar-hover[_nghost-%COMP%]:hover, .ng-scrollbar-hover[_ngcontent-%COMP%]:hover{--_track-y-thickness-px: var(--_scrollbar-hover-thickness-px)}.ng-scrollbar-hover[_nghost-%COMP%]:active, .ng-scrollbar-hover[_ngcontent-%COMP%]:active{--_track-y-thickness-px: var(--_scrollbar-active-thickness-px)}.ng-scrollbar-track-wrapper[_ngcontent-%COMP%]{width:var(--_track-y-thickness-px);flex-direction:column}.track-inner[_ngcontent-%COMP%]{inset-inline-start:var(--scrollbar-track-offset, 0px);inset-inline-end:var(--scrollbar-track-offset, 0px);inset-block-start:0;inset-block-end:0}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollbarY, [{
    type: Component,
    args: [{
      selector: "scrollbar-y",
      template: `
    <div class="ng-scrollbar-track-wrapper"
         [class.ng-scrollbar-hover]="!cmp.hoverOffset()">
      <scrollbar-track-y class="ng-scrollbar-track {{ cmp.trackClass() }}">
        <div class="track-inner">
          <scrollbar-thumb-y class="ng-scrollbar-thumb {{ cmp.thumbClass() }}"/>
        </div>
      </scrollbar-track-y>
      @if (cmp.withButtons()) {
        <!-- eslint-disable-next-line @angular-eslint/template/elements-content -->
        <button class="ng-scrollbar-button {{ cmp.buttonClass() }}"
                scrollbarButton="top"
                scrollDirection="backward"
                [disabled]="!cmp.isVerticallyScrollable()"></button>
        <!-- eslint-disable-next-line @angular-eslint/template/elements-content -->
        <button class="ng-scrollbar-button {{ cmp.buttonClass() }}"
                scrollbarButton="bottom"
                scrollDirection="forward"
                [disabled]="!cmp.isVerticallyScrollable()"></button>
      }
    </div>
  `,
      imports: [TrackYComponent, ThumbYComponent, ScrollbarButton],
      providers: [{
        provide: SCROLLBAR_CONTROL,
        useExisting: ScrollbarY
      }],
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: [":host{display:block;height:var(--_scrollbar-wrapper-height);width:var(--_scrollbar-wrapper-width);position:sticky;z-index:100;opacity:var(--_scrollbar-hover-opacity);transition:var(--_scrollbar-opacity-transition);background:var(--scrollbar-container-color, transparent);border-radius:var(--scrollbar-container-shape, 0px)}.ng-scrollbar-track-wrapper{touch-action:none;-webkit-user-select:none;user-select:none;gap:var(--scrollbar-button-gap, 0px);inset-block-start:var(--_scrollbar-track-inset-block-start);inset-block-end:var(--_scrollbar-track-inset-block-end);inset-inline-start:var(--_scrollbar-track-inset-inline-start);inset-inline-end:var(--_scrollbar-track-inset-inline-end);transition:var(--scrollbar-track-wrapper-transition, width 60ms linear, height 60ms linear);position:absolute;overflow:hidden;display:flex;place-items:center}.track-inner{position:absolute;border-radius:var(--scrollbar-track-shape, 0);background:var(--scrollbar-track-color, rgba(128, 128, 128, .5))}\n", ":host{--_scrollbar-wrapper-height: calc(var(--viewport-height) * 1px);--_scrollbar-wrapper-width: var(--_scrollbar-total-thickness-px);--_scrollbar-track-inset-block-start: var(--_vertical-inset-block-start);--_scrollbar-track-inset-block-end: var(--_vertical-inset-block-end);--_scrollbar-track-inset-inline-end: var(--_vertical-inset-inline-end);--_scrollbar-track-inset-inline-start: var(--_vertical-inset-inline-start);--_button-icon-rotate-top: 0deg;--_button-icon-rotate-bottom: 180deg;grid-area:scrollbar-y;pointer-events:var(--_scrollbar-y-pointer-events);inset-block-start:0;inset-block-end:0;inset-inline-start:var(--_scrollbar-wrapper-y-start);inset-inline-end:var(--_scrollbar-wrapper-y-end)}:host.ng-scrollbar-hover:hover,.ng-scrollbar-hover:hover{--_track-y-thickness-px: var(--_scrollbar-hover-thickness-px)}:host.ng-scrollbar-hover:active,.ng-scrollbar-hover:active{--_track-y-thickness-px: var(--_scrollbar-active-thickness-px)}.ng-scrollbar-track-wrapper{width:var(--_track-y-thickness-px);flex-direction:column}.track-inner{inset-inline-start:var(--scrollbar-track-offset, 0px);inset-inline-end:var(--scrollbar-track-offset, 0px);inset-block-start:0;inset-block-end:0}\n"]
    }]
  }], null, null);
})();
var ScrollbarX = class _ScrollbarX extends ScrollbarAdapter {
  manager = inject(ScrollbarManager);
  rectOffsetProperty = "left";
  rectSizeProperty = "width";
  sizeProperty = "clientWidth";
  clientProperty = "clientX";
  offsetProperty = "offsetX";
  axis = "x";
  // Handle dragging position (Support LTR and RTL directions for the horizontal scrollbar)
  handlePosition;
  get viewportScrollMax() {
    return this.cmp.scrollMaxX;
  }
  get viewportScrollOffset() {
    return Math.abs(this.cmp.scrollLeft);
  }
  constructor() {
    effect(() => {
      if (this.cmp.dir.valueSignal() === "rtl") {
        this.handlePosition = (position, scrollMax) => -(scrollMax - position);
      } else {
        this.handlePosition = (position) => position;
      }
    });
    super();
  }
  scrollTo(left, duration) {
    return from(this.cmp.scrollTo({
      left,
      duration
    }));
  }
  instantScrollTo(value, scrollMax) {
    this.cmp.scrollXTo(this.handlePosition(value, scrollMax));
  }
  static ɵfac = function ScrollbarX_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollbarX)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _ScrollbarX,
    selectors: [["scrollbar-x"]],
    hostVars: 1,
    hostBindings: function ScrollbarX_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("dir", ctx.cmp.dir.valueSignal());
      }
    },
    features: [ɵɵProvidersFeature([{
      provide: SCROLLBAR_CONTROL,
      useExisting: _ScrollbarX
    }]), ɵɵInheritDefinitionFeature],
    decls: 5,
    vars: 10,
    consts: [[1, "ng-scrollbar-track-wrapper"], [1, "track-inner"], ["scrollbarButton", "start", "scrollDirection", "backward", 3, "disabled"], ["scrollbarButton", "end", "scrollDirection", "forward", 3, "disabled"]],
    template: function ScrollbarX_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵelementStart(0, "div", 0)(1, "scrollbar-track-x")(2, "div", 1);
        ɵɵelement(3, "scrollbar-thumb-x");
        ɵɵelementEnd()();
        ɵɵconditionalCreate(4, ScrollbarX_Conditional_4_Template, 2, 8);
        ɵɵelementEnd();
      }
      if (rf & 2) {
        ɵɵclassProp("ng-scrollbar-hover", !ctx.cmp.hoverOffset());
        ɵɵadvance();
        ɵɵclassMap(ɵɵinterpolate1("ng-scrollbar-track ", ctx.cmp.trackClass()));
        ɵɵadvance(2);
        ɵɵclassMap(ɵɵinterpolate1("ng-scrollbar-thumb ", ctx.cmp.thumbClass()));
        ɵɵattribute("dir", ctx.cmp.dir.valueSignal());
        ɵɵadvance();
        ɵɵconditional(ctx.cmp.withButtons() ? 4 : -1);
      }
    },
    dependencies: [TrackXComponent, ThumbXComponent, ScrollbarButton],
    styles: [_c3, "[_nghost-%COMP%]{--_scrollbar-wrapper-height: var(--_scrollbar-total-thickness-px);--_scrollbar-wrapper-width: calc(var(--viewport-width) * 1px);--_scrollbar-track-inset-block-start: var(--_horizontal-block-start);--_scrollbar-track-inset-block-end: var(--_horizontal-block-end);--_scrollbar-track-inset-inline-end: var(--_horizontal-inline-end);--_scrollbar-track-inset-inline-start: var(--_horizontal-inline-start);--_button-icon-rotate-start: -90deg;--_button-icon-rotate-end: 90deg}[dir=rtl][_nghost-%COMP%]{--_button-icon-rotate-start: 90deg;--_button-icon-rotate-end: -90deg}[_nghost-%COMP%]{grid-area:scrollbar-x;pointer-events:var(--_scrollbar-x-pointer-events);inset-block-start:var(--_scrollbar-wrapper-x-top);inset-block-end:var(--_scrollbar-wrapper-x-bottom);inset-inline-start:0;inset-inline-end:0}.ng-scrollbar-hover[_nghost-%COMP%]:hover, .ng-scrollbar-hover[_ngcontent-%COMP%]:hover{--_track-x-thickness-px: var(--_scrollbar-hover-thickness-px)}.ng-scrollbar-hover[_nghost-%COMP%]:active, .ng-scrollbar-hover[_ngcontent-%COMP%]:active{--_track-x-thickness-px: var(--_scrollbar-active-thickness-px)}.ng-scrollbar-track-wrapper[_ngcontent-%COMP%]{height:var(--_track-x-thickness-px);flex-direction:row}.track-inner[_ngcontent-%COMP%]{inset-inline-start:0;inset-inline-end:0;inset-block-start:var(--scrollbar-track-offset, 0px);inset-block-end:var(--scrollbar-track-offset, 0px)}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollbarX, [{
    type: Component,
    args: [{
      selector: "scrollbar-x",
      template: `
    <div class="ng-scrollbar-track-wrapper"
         [class.ng-scrollbar-hover]="!cmp.hoverOffset()">
      <scrollbar-track-x class="ng-scrollbar-track {{ cmp.trackClass() }}">
        <div class="track-inner">
          <scrollbar-thumb-x class="ng-scrollbar-thumb {{ cmp.thumbClass() }}" [attr.dir]="cmp.dir.valueSignal()"/>
        </div>
      </scrollbar-track-x>
      @if (cmp.withButtons()) {
        <!-- eslint-disable-next-line @angular-eslint/template/elements-content -->
        <button class="ng-scrollbar-button {{ cmp.buttonClass() }}"
                scrollbarButton="start"
                scrollDirection="backward"
                [disabled]="!cmp.isHorizontallyScrollable()"></button>
        <!-- eslint-disable-next-line @angular-eslint/template/elements-content -->
        <button class="ng-scrollbar-button {{ cmp.buttonClass() }}"
                scrollbarButton="end"
                scrollDirection="forward"
                [disabled]="!cmp.isHorizontallyScrollable()"></button>
      }
    </div>
  `,
      imports: [TrackXComponent, ThumbXComponent, ScrollbarButton],
      providers: [{
        provide: SCROLLBAR_CONTROL,
        useExisting: ScrollbarX
      }],
      host: {
        "[attr.dir]": "cmp.dir.valueSignal()"
      },
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: [":host{display:block;height:var(--_scrollbar-wrapper-height);width:var(--_scrollbar-wrapper-width);position:sticky;z-index:100;opacity:var(--_scrollbar-hover-opacity);transition:var(--_scrollbar-opacity-transition);background:var(--scrollbar-container-color, transparent);border-radius:var(--scrollbar-container-shape, 0px)}.ng-scrollbar-track-wrapper{touch-action:none;-webkit-user-select:none;user-select:none;gap:var(--scrollbar-button-gap, 0px);inset-block-start:var(--_scrollbar-track-inset-block-start);inset-block-end:var(--_scrollbar-track-inset-block-end);inset-inline-start:var(--_scrollbar-track-inset-inline-start);inset-inline-end:var(--_scrollbar-track-inset-inline-end);transition:var(--scrollbar-track-wrapper-transition, width 60ms linear, height 60ms linear);position:absolute;overflow:hidden;display:flex;place-items:center}.track-inner{position:absolute;border-radius:var(--scrollbar-track-shape, 0);background:var(--scrollbar-track-color, rgba(128, 128, 128, .5))}\n", ":host{--_scrollbar-wrapper-height: var(--_scrollbar-total-thickness-px);--_scrollbar-wrapper-width: calc(var(--viewport-width) * 1px);--_scrollbar-track-inset-block-start: var(--_horizontal-block-start);--_scrollbar-track-inset-block-end: var(--_horizontal-block-end);--_scrollbar-track-inset-inline-end: var(--_horizontal-inline-end);--_scrollbar-track-inset-inline-start: var(--_horizontal-inline-start);--_button-icon-rotate-start: -90deg;--_button-icon-rotate-end: 90deg}:host[dir=rtl]{--_button-icon-rotate-start: 90deg;--_button-icon-rotate-end: -90deg}:host{grid-area:scrollbar-x;pointer-events:var(--_scrollbar-x-pointer-events);inset-block-start:var(--_scrollbar-wrapper-x-top);inset-block-end:var(--_scrollbar-wrapper-x-bottom);inset-inline-start:0;inset-inline-end:0}:host.ng-scrollbar-hover:hover,.ng-scrollbar-hover:hover{--_track-x-thickness-px: var(--_scrollbar-hover-thickness-px)}:host.ng-scrollbar-hover:active,.ng-scrollbar-hover:active{--_track-x-thickness-px: var(--_scrollbar-active-thickness-px)}.ng-scrollbar-track-wrapper{height:var(--_track-x-thickness-px);flex-direction:row}.track-inner{inset-inline-start:0;inset-inline-end:0;inset-block-start:var(--scrollbar-track-offset, 0px);inset-block-end:var(--scrollbar-track-offset, 0px)}\n"]
    }]
  }], () => [], null);
})();
var Scrollbars = class _Scrollbars {
  adapter = inject(ViewportAdapter);
  static ɵfac = function Scrollbars_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _Scrollbars)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _Scrollbars,
    selectors: [["scrollbars"]],
    decls: 2,
    vars: 2,
    template: function Scrollbars_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵconditionalCreate(0, Scrollbars_Conditional_0_Template, 1, 0, "scrollbar-y");
        ɵɵconditionalCreate(1, Scrollbars_Conditional_1_Template, 1, 0, "scrollbar-x");
      }
      if (rf & 2) {
        ɵɵconditional(ctx.adapter.verticalUsed() ? 0 : -1);
        ɵɵadvance();
        ɵɵconditional(ctx.adapter.horizontalUsed() ? 1 : -1);
      }
    },
    dependencies: [ScrollbarX, ScrollbarY],
    styles: ["[_nghost-%COMP%]{pointer-events:none;position:absolute;inset:0;display:grid;grid-template:var(--_scrollbar-grid-template)}"]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(Scrollbars, [{
    type: Component,
    args: [{
      selector: "scrollbars",
      changeDetection: ChangeDetectionStrategy.OnPush,
      imports: [ScrollbarX, ScrollbarY],
      template: `
    @if (adapter.verticalUsed()) {
      <scrollbar-y/>
    }
    @if (adapter.horizontalUsed()) {
      <scrollbar-x/>
    }
  `,
      styles: [":host{pointer-events:none;position:absolute;inset:0;display:grid;grid-template:var(--_scrollbar-grid-template)}\n"]
    }]
  }], null, null);
})();
var NgScrollbarCore = class _NgScrollbarCore {
  platform = inject(Platform);
  sharedResizeObserver = inject(SharedResizeObserver);
  /** Viewport adapter instance */
  adapter = inject(ViewportAdapter);
  /** Viewport native element */
  nativeElement = inject(ElementRef).nativeElement;
  /** A flag that indicates if the platform is mobile */
  isMobile = this.platform.IOS || this.platform.ANDROID;
  constructor() {
    let resizeSub$;
    let hasInitialized;
    afterRenderEffect({
      earlyRead: (onCleanup) => {
        const disableSensor = this.adapter.disableSensor();
        const throttleDuration = this.adapter.sensorThrottleTime();
        const viewportInit = this.adapter.initialized();
        untracked(() => {
          if (viewportInit) {
            if (disableSensor) {
              requestAnimationFrame(() => this.update(ScrollbarUpdateReason.AfterInit));
            } else {
              resizeSub$ = getThrottledStream(combineLatest([this.sharedResizeObserver.observe(this.adapter.viewportElement), this.sharedResizeObserver.observe(this.adapter.contentWrapperElement)]), throttleDuration).subscribe(() => {
                this.updateDimensions();
                if (hasInitialized) {
                  this.adapter.afterUpdate.emit();
                } else {
                  this.adapter.afterInit.emit();
                }
                hasInitialized = true;
              });
            }
          }
          onCleanup(() => resizeSub$?.unsubscribe());
        });
      }
    });
  }
  /**
   * Manual update
   */
  update(reason) {
    this.updateDimensions();
    if (reason === ScrollbarUpdateReason.AfterInit) {
      this.adapter.afterInit.emit();
    } else {
      this.adapter.afterUpdate.emit();
    }
  }
  updateDimensions() {
    this.adapter.viewportDimension.set({
      width: this.adapter.clientWidth,
      height: this.adapter.clientHeight
    });
    this.adapter.contentDimension.set({
      width: this.adapter.contentWidth,
      height: this.adapter.contentHeight
    });
  }
  static ɵfac = function NgScrollbarCore_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgScrollbarCore)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NgScrollbarCore,
    hostVars: 22,
    hostBindings: function NgScrollbarCore_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵattribute("mobile", ctx.isMobile)("dir", ctx.adapter.dir.valueSignal())("dragging", ctx.adapter.dragging())("position", ctx.adapter.position())("appearance", ctx.adapter.appearance())("visibility", ctx.adapter.visibility())("orientation", ctx.adapter.orientation())("disableInteraction", ctx.adapter.disableInteraction())("verticalUsed", ctx.adapter.verticalUsed())("horizontalUsed", ctx.adapter.horizontalUsed())("isVerticallyScrollable", ctx.adapter.isVerticallyScrollable())("isHorizontallyScrollable", ctx.adapter.isHorizontallyScrollable());
        ɵɵstyleProp("--content-height", ctx.adapter.contentDimension().height)("--content-width", ctx.adapter.contentDimension().width)("--viewport-height", ctx.adapter.viewportDimension().height)("--viewport-width", ctx.adapter.viewportDimension().width);
        ɵɵclassProp("ng-scroll-viewport", true);
      }
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgScrollbarCore, [{
    type: Directive,
    args: [{
      host: {
        "[class.ng-scroll-viewport]": "true",
        "[attr.mobile]": "isMobile",
        "[attr.dir]": "adapter.dir.valueSignal()",
        "[attr.dragging]": "adapter.dragging()",
        "[attr.position]": "adapter.position()",
        "[attr.appearance]": "adapter.appearance()",
        "[attr.visibility]": "adapter.visibility()",
        "[attr.orientation]": "adapter.orientation()",
        "[attr.disableInteraction]": "adapter.disableInteraction()",
        "[attr.verticalUsed]": "adapter.verticalUsed()",
        "[attr.horizontalUsed]": "adapter.horizontalUsed()",
        "[attr.isVerticallyScrollable]": "adapter.isVerticallyScrollable()",
        "[attr.isHorizontallyScrollable]": "adapter.isHorizontallyScrollable()",
        "[style.--content-height]": "adapter.contentDimension().height",
        "[style.--content-width]": "adapter.contentDimension().width",
        "[style.--viewport-height]": "adapter.viewportDimension().height",
        "[style.--viewport-width]": "adapter.viewportDimension().width"
      }
    }]
  }], () => [], null);
})();
var ScrollViewport = class _ScrollViewport extends NgScrollbarCore {
  renderer = inject(Renderer2);
  appRef = inject(ApplicationRef);
  injector = inject(Injector);
  scrollbarsRef;
  contentWrapperRef;
  /**
   * The element that wraps the content inside the viewport.
   */
  contentWrapperElement;
  /**
   * The spacer element used by virtual scroll component.
   */
  spacerElement;
  constructor() {
    afterNextRender({
      write: () => {
        this.createContentWrapper(this.contentWrapperElement);
        this.attachScrollbars(this.spacerElement || this.contentWrapperElement);
        this.adapter.init(this.nativeElement, this.contentWrapperElement, this.spacerElement);
        this.spacerElement?.classList.add(ViewportClasses.Spacer);
      }
    });
    super();
  }
  ngOnDestroy() {
    this.adapter.reset();
    if (this.scrollbarsRef) {
      this.appRef.detachView(this.scrollbarsRef.hostView);
      this.scrollbarsRef.destroy();
      this.scrollbarsRef = null;
    }
    if (this.contentWrapperRef) {
      this.appRef.detachView(this.contentWrapperRef.hostView);
      this.contentWrapperRef.destroy();
      this.contentWrapperRef = null;
    }
  }
  createContentWrapper(hostElement) {
    if (hostElement) {
      this.contentWrapperRef = createComponent(ScrollContent, {
        hostElement,
        elementInjector: this.injector,
        environmentInjector: this.appRef.injector,
        projectableNodes: [Array.from(hostElement.childNodes)]
      });
    } else {
      this.contentWrapperRef = createComponent(ScrollContent, {
        elementInjector: this.injector,
        environmentInjector: this.appRef.injector,
        projectableNodes: [Array.from(this.nativeElement.childNodes)]
      });
      this.contentWrapperElement = this.contentWrapperRef.location.nativeElement;
      this.renderer.appendChild(this.nativeElement, this.contentWrapperElement);
    }
    this.appRef.attachView(this.contentWrapperRef.hostView);
  }
  attachScrollbars(hostElement) {
    this.scrollbarsRef = createComponent(Scrollbars, {
      elementInjector: this.injector,
      environmentInjector: this.appRef.injector
    });
    this.renderer.appendChild(hostElement, this.scrollbarsRef.location.nativeElement);
    this.appRef.attachView(this.scrollbarsRef.hostView);
  }
  static ɵfac = function ScrollViewport_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ScrollViewport)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _ScrollViewport,
    selectors: [["ng-scroll-viewport"]],
    inputs: {
      contentWrapperElement: "contentWrapperElement",
      spacerElement: "spacerElement"
    },
    features: [ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function ScrollViewport_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    styles: ['[_nghost-%COMP%]{--_scrollbar-track-thickness-px: var(--scrollbar-track-thickness, 7px);--_scrollbar-container-offset-px: var(--scrollbar-container-offset, 0px);--_scrollbar-total-thickness-px: calc(var(--_scrollbar-track-thickness-px) + var(--_scrollbar-container-offset-px) * 2);--_scrollbar-thumb-min-size: var(--scrollbar-thumb-min-size, 20);position:relative!important;box-sizing:border-box!important;padding:0!important;-webkit-overflow-scrolling:touch;will-change:scroll-position;scrollbar-width:none!important}[_nghost-%COMP%]    >.ng-scroll-spacer{position:absolute;inset-block-start:0;inset-inline-start:0;width:calc(var(--_spacer-width) * 1px);height:calc(var(--_spacer-height) * 1px);min-width:100%;min-height:100%}[_nghost-%COMP%]{--_viewport-overflow: auto;--_scrollbar-content-width: fit-content;overflow:var(--_viewport-overflow)}[orientation=vertical][_nghost-%COMP%]{--_viewport-overflow: hidden auto;--_scrollbar-content-width: unset}[orientation=horizontal][_nghost-%COMP%]{--_viewport-overflow: auto hidden}[_nghost-%COMP%]{--_vertical-inset-block-start: var(--_scrollbar-container-offset-px);--_vertical-inset-block-end: var(--_scrollbar-container-offset-px);--_horizontal-inline-start: var(--_scrollbar-container-offset-px);--_horizontal-inline-end: var(--_scrollbar-container-offset-px);--_scrollbar-grid-template: ". scrollbar-y" 1fr "scrollbar-x ." auto / 1fr auto;--_scrollbar-wrapper-y-start: initial;--_scrollbar-wrapper-y-end: 0;--_scrollbar-wrapper-x-top: initial;--_scrollbar-wrapper-x-bottom: 0}[position=invertY][_nghost-%COMP%]{--_scrollbar-grid-template: "scrollbar-y ." 1fr ". scrollbar-x" auto / auto 1fr}[position=invertX][_nghost-%COMP%]{--_scrollbar-grid-template: "scrollbar-x ." auto ". scrollbar-y" 1fr / 1fr auto}[position=invertAll][_nghost-%COMP%]{--_scrollbar-grid-template: ". scrollbar-x" auto "scrollbar-y ." 1fr / auto 1fr }[_nghost-%COMP%]{--_horizontal-block-start: initial;--_horizontal-block-end: var(--_scrollbar-container-offset-px)}[_nghost-%COMP%]:is([position=invertX],[position=invertAll]){--_horizontal-block-start: var(--_scrollbar-container-offset-px);--_horizontal-block-end: initial;--_scrollbar-wrapper-x-top: 0;--_scrollbar-wrapper-x-bottom: initial}[_nghost-%COMP%]{--_vertical-inset-inline-end: var(--_scrollbar-container-offset-px);--_vertical-inset-inline-start: initial}[_nghost-%COMP%]:is([position=invertY],[position=invertAll]){--_vertical-inset-inline-start: var(--_scrollbar-container-offset-px);--_vertical-inset-inline-end: initial;--_scrollbar-wrapper-y-start: 0;--_scrollbar-wrapper-y-end: initial}[verticalUsed=true][horizontalUsed=true][_nghost-%COMP%]{--_scrollbar-thickness-margin-px: calc(var(--_scrollbar-track-thickness-px) + var(--_scrollbar-container-offset-px) * 3)}[horizontalUsed=true][_nghost-%COMP%]{--_vertical-inset-block-start: var(--_scrollbar-container-offset-px);--_vertical-inset-block-end: var(--_scrollbar-thickness-margin-px)}[horizontalUsed=true][_nghost-%COMP%]:is([position=invertX],[position=invertAll]){--_vertical-inset-block-start: var(--_scrollbar-thickness-margin-px);--_vertical-inset-block-end: var(--_scrollbar-container-offset-px)}[verticalUsed=true][_nghost-%COMP%]{--_horizontal-inline-start: var(--_scrollbar-container-offset-px);--_horizontal-inline-end: var(--_scrollbar-thickness-margin-px)}[verticalUsed=true][_nghost-%COMP%]:is([position=invertY],[position=invertAll]){--_horizontal-inline-start: var(--_scrollbar-thickness-margin-px);--_horizontal-inline-end: var(--_scrollbar-container-offset-px)}[_nghost-%COMP%]{--_viewport-padding-block-start: 0;--_viewport-padding-block-end: 0;--_viewport-padding-inline-start: 0;--_viewport-padding-inline-end: 0}[appearance=native][verticalUsed=true][_nghost-%COMP%]{--_viewport-padding-inline-start: 0;--_viewport-padding-inline-end: var(--_scrollbar-total-thickness-px)}[appearance=native][verticalUsed=true][_nghost-%COMP%]:is([position=invertY],[position=invertAll]){--_viewport-padding-inline-start: var(--_scrollbar-total-thickness-px);--_viewport-padding-inline-end: 0}[appearance=native][horizontalUsed=true][_nghost-%COMP%]{--_viewport-padding-block-start: 0;--_viewport-padding-block-end: var(--_scrollbar-total-thickness-px)}[appearance=native][horizontalUsed=true][_nghost-%COMP%]:is([position=invertX],[position=invertAll]){--_viewport-padding-block-start: var(--_scrollbar-total-thickness-px);--_viewport-padding-block-end: 0}[_nghost-%COMP%]{--_horizontal-thumb-display: block;--_vertical-thumb-display: block}[isVerticallyScrollable=false][_nghost-%COMP%]{--_vertical-thumb-display: none}[isHorizontallyScrollable=false][_nghost-%COMP%]{--_horizontal-thumb-display: none}[visibility=hover][_nghost-%COMP%]{--_scrollbar-hover-opacity: 0;--_scrollbar-opacity-transition: opacity var(--scrollbar-hover-opacity-transition-leave-duration, .4s) var(--scrollbar-hover-opacity-transition-leave-delay, 1s)}[visibility=hover][scrolling=true][_nghost-%COMP%], [visibility=hover][_nghost-%COMP%]:hover, [visibility=hover][_nghost-%COMP%]:active, [visibility=hover][_nghost-%COMP%]:focus{--_scrollbar-hover-opacity: 1;--_scrollbar-opacity-transition: opacity var(--scrollbar-hover-opacity-transition-enter-duration, 0)}[_nghost-%COMP%]{--_viewport_scroll-timeline: unset;--_animation-timeline-y: unset;--_scrollbar-thumb-transform-from: unset;--_scrollbar-thumb-transform-to: unset}[verticalUsed=true][_nghost-%COMP%]{--_timeline-scope: --scrollerY;--_animation-timeline-y: --scrollerY;--_viewport_scroll-timeline: --scrollerY y}[horizontalUsed=true][_nghost-%COMP%]{--_timeline-scope: --scrollerX;--_animation-timeline-x: --scrollerX;--_viewport_scroll-timeline: --scrollerX x}[verticalUsed=true][horizontalUsed=true][_nghost-%COMP%]{--_timeline-scope: --scrollerX, --scrollerY;--_viewport_scroll-timeline: --scrollerX x, --scrollerY y}[_nghost-%COMP%]{scroll-timeline:var(--_viewport_scroll-timeline);--_scrollbar-hover-thickness-px: var(--scrollbar-track-hover-thickness, var(--_scrollbar-track-thickness-px));--_scrollbar-active-thickness-px: var(--scrollbar-track-active-thickness, var(--_scrollbar-hover-thickness-px));--_track-y-thickness-px: var(--_scrollbar-track-thickness-px);--_track-x-thickness-px: var(--_scrollbar-track-thickness-px);-webkit-user-select:var(--_viewport-user-select);user-select:var(--_viewport-user-select)}[dragging=x][_nghost-%COMP%], [dragging=y][_nghost-%COMP%]{--_viewport-user-select: none}[dragging=x][_nghost-%COMP%]{--_track-x-thickness-px: var(--_scrollbar-active-thickness-px)}[dragging=y][_nghost-%COMP%]{--_track-y-thickness-px: var(--_scrollbar-active-thickness-px)}[_nghost-%COMP%]{overscroll-behavior:var(--scrollbar-overscroll-behavior, initial)}[mobile=true][_nghost-%COMP%]{overscroll-behavior:var(--scrollbar-mobile-overscroll-behavior, none)}[_nghost-%COMP%]{--_viewport-pointer-events: auto;--_scrollbar-y-pointer-events: auto;--_scrollbar-x-pointer-events: auto;pointer-events:var(--_viewport-pointer-events)}[disableInteraction=true][_nghost-%COMP%]{--_viewport-pointer-events: none;--_scrollbar-y-pointer-events: none;--_scrollbar-x-pointer-events: none}[isVerticallyScrollable=false][_nghost-%COMP%]{--_scrollbar-y-pointer-events: none}[isHorizontallyScrollable=false][_nghost-%COMP%]{--_scrollbar-x-pointer-events: none}[_nghost-%COMP%]{--_scrollbar-thumb-color: var(--scrollbar-thumb-color, #1e90ff);--_scrollbar-thumb-hover-color: var(--scrollbar-thumb-hover-color, var(--_scrollbar-thumb-color));--_scrollbar-thumb-active-color: var(--scrollbar-thumb-active-color, var(--_scrollbar-thumb-hover-color));--_scrollbar-button-color: var(--scrollbar-button-color, transparent);--_scrollbar-button-hover-color: var(--scrollbar-button-hover-color, var(--_scrollbar-button-color));--_scrollbar-button-active-color: var(--scrollbar-button-active-color, var(--_scrollbar-button-hover-color));--_scrollbar-button-inactive-color: var(--scrollbar-button-inactive-color, color-mix(in srgb, var(--_scrollbar-button-color), #000 35%));--_scrollbar-button-fill: var(--scrollbar-button-fill, var(--_scrollbar-thumb-color));--_scrollbar-button-hover-fill: var(--scrollbar-button-hover-fill, var(--_scrollbar-thumb-hover-color));--_scrollbar-button-active-fill: var(--scrollbar-button-active-fill, var(--_scrollbar-thumb-active-color));--_scrollbar-button-inactive-fill: var(--scrollbar-button-inactive-fill, color-mix(in srgb, var(--_scrollbar-button-fill), #000 35%))}@layer default{[_nghost-%COMP%]{display:block;max-height:100%;max-width:100%}}']
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ScrollViewport, [{
    type: Component,
    args: [{
      selector: "ng-scroll-viewport",
      template: "<ng-content/>",
      changeDetection: ChangeDetectionStrategy.OnPush,
      styles: [':host{--_scrollbar-track-thickness-px: var(--scrollbar-track-thickness, 7px);--_scrollbar-container-offset-px: var(--scrollbar-container-offset, 0px);--_scrollbar-total-thickness-px: calc(var(--_scrollbar-track-thickness-px) + var(--_scrollbar-container-offset-px) * 2);--_scrollbar-thumb-min-size: var(--scrollbar-thumb-min-size, 20);position:relative!important;box-sizing:border-box!important;padding:0!important;-webkit-overflow-scrolling:touch;will-change:scroll-position;scrollbar-width:none!important}:host ::ng-deep>.ng-scroll-spacer{position:absolute;inset-block-start:0;inset-inline-start:0;width:calc(var(--_spacer-width) * 1px);height:calc(var(--_spacer-height) * 1px);min-width:100%;min-height:100%}:host{--_viewport-overflow: auto;--_scrollbar-content-width: fit-content;overflow:var(--_viewport-overflow)}:host[orientation=vertical]{--_viewport-overflow: hidden auto;--_scrollbar-content-width: unset}:host[orientation=horizontal]{--_viewport-overflow: auto hidden}:host{--_vertical-inset-block-start: var(--_scrollbar-container-offset-px);--_vertical-inset-block-end: var(--_scrollbar-container-offset-px);--_horizontal-inline-start: var(--_scrollbar-container-offset-px);--_horizontal-inline-end: var(--_scrollbar-container-offset-px);--_scrollbar-grid-template: ". scrollbar-y" 1fr "scrollbar-x ." auto / 1fr auto;--_scrollbar-wrapper-y-start: initial;--_scrollbar-wrapper-y-end: 0;--_scrollbar-wrapper-x-top: initial;--_scrollbar-wrapper-x-bottom: 0}:host[position=invertY]{--_scrollbar-grid-template: "scrollbar-y ." 1fr ". scrollbar-x" auto / auto 1fr}:host[position=invertX]{--_scrollbar-grid-template: "scrollbar-x ." auto ". scrollbar-y" 1fr / 1fr auto}:host[position=invertAll]{--_scrollbar-grid-template: ". scrollbar-x" auto "scrollbar-y ." 1fr / auto 1fr }:host{--_horizontal-block-start: initial;--_horizontal-block-end: var(--_scrollbar-container-offset-px)}:host:is([position=invertX],[position=invertAll]){--_horizontal-block-start: var(--_scrollbar-container-offset-px);--_horizontal-block-end: initial;--_scrollbar-wrapper-x-top: 0;--_scrollbar-wrapper-x-bottom: initial}:host{--_vertical-inset-inline-end: var(--_scrollbar-container-offset-px);--_vertical-inset-inline-start: initial}:host:is([position=invertY],[position=invertAll]){--_vertical-inset-inline-start: var(--_scrollbar-container-offset-px);--_vertical-inset-inline-end: initial;--_scrollbar-wrapper-y-start: 0;--_scrollbar-wrapper-y-end: initial}:host[verticalUsed=true][horizontalUsed=true]{--_scrollbar-thickness-margin-px: calc(var(--_scrollbar-track-thickness-px) + var(--_scrollbar-container-offset-px) * 3)}:host[horizontalUsed=true]{--_vertical-inset-block-start: var(--_scrollbar-container-offset-px);--_vertical-inset-block-end: var(--_scrollbar-thickness-margin-px)}:host[horizontalUsed=true]:is([position=invertX],[position=invertAll]){--_vertical-inset-block-start: var(--_scrollbar-thickness-margin-px);--_vertical-inset-block-end: var(--_scrollbar-container-offset-px)}:host[verticalUsed=true]{--_horizontal-inline-start: var(--_scrollbar-container-offset-px);--_horizontal-inline-end: var(--_scrollbar-thickness-margin-px)}:host[verticalUsed=true]:is([position=invertY],[position=invertAll]){--_horizontal-inline-start: var(--_scrollbar-thickness-margin-px);--_horizontal-inline-end: var(--_scrollbar-container-offset-px)}:host{--_viewport-padding-block-start: 0;--_viewport-padding-block-end: 0;--_viewport-padding-inline-start: 0;--_viewport-padding-inline-end: 0}:host[appearance=native][verticalUsed=true]{--_viewport-padding-inline-start: 0;--_viewport-padding-inline-end: var(--_scrollbar-total-thickness-px)}:host[appearance=native][verticalUsed=true]:is([position=invertY],[position=invertAll]){--_viewport-padding-inline-start: var(--_scrollbar-total-thickness-px);--_viewport-padding-inline-end: 0}:host[appearance=native][horizontalUsed=true]{--_viewport-padding-block-start: 0;--_viewport-padding-block-end: var(--_scrollbar-total-thickness-px)}:host[appearance=native][horizontalUsed=true]:is([position=invertX],[position=invertAll]){--_viewport-padding-block-start: var(--_scrollbar-total-thickness-px);--_viewport-padding-block-end: 0}:host{--_horizontal-thumb-display: block;--_vertical-thumb-display: block}:host[isVerticallyScrollable=false]{--_vertical-thumb-display: none}:host[isHorizontallyScrollable=false]{--_horizontal-thumb-display: none}:host[visibility=hover]{--_scrollbar-hover-opacity: 0;--_scrollbar-opacity-transition: opacity var(--scrollbar-hover-opacity-transition-leave-duration, .4s) var(--scrollbar-hover-opacity-transition-leave-delay, 1s)}:host[visibility=hover][scrolling=true],:host[visibility=hover]:hover,:host[visibility=hover]:active,:host[visibility=hover]:focus{--_scrollbar-hover-opacity: 1;--_scrollbar-opacity-transition: opacity var(--scrollbar-hover-opacity-transition-enter-duration, 0)}:host{--_viewport_scroll-timeline: unset;--_animation-timeline-y: unset;--_scrollbar-thumb-transform-from: unset;--_scrollbar-thumb-transform-to: unset}:host[verticalUsed=true]{--_timeline-scope: --scrollerY;--_animation-timeline-y: --scrollerY;--_viewport_scroll-timeline: --scrollerY y}:host[horizontalUsed=true]{--_timeline-scope: --scrollerX;--_animation-timeline-x: --scrollerX;--_viewport_scroll-timeline: --scrollerX x}:host[verticalUsed=true][horizontalUsed=true]{--_timeline-scope: --scrollerX, --scrollerY;--_viewport_scroll-timeline: --scrollerX x, --scrollerY y}:host{scroll-timeline:var(--_viewport_scroll-timeline);--_scrollbar-hover-thickness-px: var(--scrollbar-track-hover-thickness, var(--_scrollbar-track-thickness-px));--_scrollbar-active-thickness-px: var(--scrollbar-track-active-thickness, var(--_scrollbar-hover-thickness-px));--_track-y-thickness-px: var(--_scrollbar-track-thickness-px);--_track-x-thickness-px: var(--_scrollbar-track-thickness-px);-webkit-user-select:var(--_viewport-user-select);user-select:var(--_viewport-user-select)}:host[dragging=x],:host[dragging=y]{--_viewport-user-select: none}:host[dragging=x]{--_track-x-thickness-px: var(--_scrollbar-active-thickness-px)}:host[dragging=y]{--_track-y-thickness-px: var(--_scrollbar-active-thickness-px)}:host{overscroll-behavior:var(--scrollbar-overscroll-behavior, initial)}:host[mobile=true]{overscroll-behavior:var(--scrollbar-mobile-overscroll-behavior, none)}:host{--_viewport-pointer-events: auto;--_scrollbar-y-pointer-events: auto;--_scrollbar-x-pointer-events: auto;pointer-events:var(--_viewport-pointer-events)}:host[disableInteraction=true]{--_viewport-pointer-events: none;--_scrollbar-y-pointer-events: none;--_scrollbar-x-pointer-events: none}:host[isVerticallyScrollable=false]{--_scrollbar-y-pointer-events: none}:host[isHorizontallyScrollable=false]{--_scrollbar-x-pointer-events: none}:host{--_scrollbar-thumb-color: var(--scrollbar-thumb-color, #1e90ff);--_scrollbar-thumb-hover-color: var(--scrollbar-thumb-hover-color, var(--_scrollbar-thumb-color));--_scrollbar-thumb-active-color: var(--scrollbar-thumb-active-color, var(--_scrollbar-thumb-hover-color));--_scrollbar-button-color: var(--scrollbar-button-color, transparent);--_scrollbar-button-hover-color: var(--scrollbar-button-hover-color, var(--_scrollbar-button-color));--_scrollbar-button-active-color: var(--scrollbar-button-active-color, var(--_scrollbar-button-hover-color));--_scrollbar-button-inactive-color: var(--scrollbar-button-inactive-color, color-mix(in srgb, var(--_scrollbar-button-color), #000 35%));--_scrollbar-button-fill: var(--scrollbar-button-fill, var(--_scrollbar-thumb-color));--_scrollbar-button-hover-fill: var(--scrollbar-button-hover-fill, var(--_scrollbar-thumb-hover-color));--_scrollbar-button-active-fill: var(--scrollbar-button-active-fill, var(--_scrollbar-thumb-active-color));--_scrollbar-button-inactive-fill: var(--scrollbar-button-inactive-fill, color-mix(in srgb, var(--_scrollbar-button-fill), #000 35%))}@layer default{:host{display:block;max-height:100%;max-width:100%}}\n']
    }]
  }], () => [], {
    contentWrapperElement: [{
      type: Input
    }],
    spacerElement: [{
      type: Input
    }]
  });
})();
var NgScrollbar = class _NgScrollbar extends NgScrollbarCore {
  /* v8 ignore start */
  contentWrapper = viewChild.required(ScrollContent, {
    read: ElementRef
  });
  /* v8 ignore stop */
  contentWrapperElement = computed(() => this.contentWrapper().nativeElement, ...ngDevMode ? [{
    debugName: "contentWrapperElement"
  }] : (
    /* istanbul ignore next */
    []
  ));
  constructor() {
    effect(() => {
      const contentWrapper = this.contentWrapperElement();
      untracked(() => {
        this.adapter.init(this.nativeElement, contentWrapper);
      });
    });
    super();
  }
  /**
   * Smooth scroll functions
   */
  scrollTo(options) {
    return this.adapter.scrollTo(options);
  }
  /**
   * Scroll to an element by reference or selector
   */
  scrollToElement(target, options) {
    return this.adapter.scrollToElement(target, options);
  }
  static ɵfac = function NgScrollbar_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgScrollbar)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NgScrollbar,
    selectors: [["ng-scrollbar", 3, "externalViewport", ""], ["", "ngScrollbar", ""]],
    viewQuery: function NgScrollbar_Query(rf, ctx) {
      if (rf & 1) {
        ɵɵviewQuerySignal(ctx.contentWrapper, ScrollContent, 5, ElementRef);
      }
      if (rf & 2) {
        ɵɵqueryAdvance();
      }
    },
    hostVars: 2,
    hostBindings: function NgScrollbar_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵclassProp("ng-scrollbar", true);
      }
    },
    exportAs: ["ngScrollbar"],
    features: [ɵɵHostDirectivesFeature([{
      directive: ViewportAdapter,
      inputs: ["position", "position", "withButtons", "withButtons", "appearance", "appearance", "thumbClass", "thumbClass", "trackClass", "trackClass", "buttonClass", "buttonClass", "visibility", "visibility", "hoverOffset", "hoverOffset", "orientation", "orientation", "disableSensor", "disableSensor", "sensorThrottleTime", "sensorThrottleTime", "disableInteraction", "disableInteraction", "trackScrollDuration", "trackScrollDuration"],
      outputs: ["afterInit", "afterInit", "afterUpdate", "afterUpdate"]
    }]), ɵɵInheritDefinitionFeature],
    ngContentSelectors: _c0,
    decls: 3,
    vars: 0,
    template: function NgScrollbar_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵelementStart(0, "ng-scroll-content");
        ɵɵprojection(1);
        ɵɵelement(2, "scrollbars");
        ɵɵelementEnd();
      }
    },
    dependencies: [Scrollbars, ScrollContent],
    styles: [_c4]
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgScrollbar, [{
    type: Component,
    args: [{
      host: {
        "[class.ng-scrollbar]": "true"
      },
      selector: "ng-scrollbar:not([externalViewport]), [ngScrollbar]",
      exportAs: "ngScrollbar",
      imports: [Scrollbars, ScrollContent],
      template: `
    <ng-scroll-content>
      <ng-content/>
      <scrollbars/>
    </ng-scroll-content>
  `,
      changeDetection: ChangeDetectionStrategy.OnPush,
      hostDirectives: [{
        directive: ViewportAdapter,
        inputs: ["position", "withButtons", "appearance", "thumbClass", "trackClass", "buttonClass", "visibility", "hoverOffset", "orientation", "disableSensor", "sensorThrottleTime", "disableInteraction", "trackScrollDuration"],
        outputs: ["afterInit", "afterUpdate"]
      }],
      styles: [':host{--_scrollbar-track-thickness-px: var(--scrollbar-track-thickness, 7px);--_scrollbar-container-offset-px: var(--scrollbar-container-offset, 0px);--_scrollbar-total-thickness-px: calc(var(--_scrollbar-track-thickness-px) + var(--_scrollbar-container-offset-px) * 2);--_scrollbar-thumb-min-size: var(--scrollbar-thumb-min-size, 20);position:relative!important;box-sizing:border-box!important;padding:0!important;-webkit-overflow-scrolling:touch;will-change:scroll-position;scrollbar-width:none!important}:host ::ng-deep>.ng-scroll-spacer{position:absolute;inset-block-start:0;inset-inline-start:0;width:calc(var(--_spacer-width) * 1px);height:calc(var(--_spacer-height) * 1px);min-width:100%;min-height:100%}:host{--_viewport-overflow: auto;--_scrollbar-content-width: fit-content;overflow:var(--_viewport-overflow)}:host[orientation=vertical]{--_viewport-overflow: hidden auto;--_scrollbar-content-width: unset}:host[orientation=horizontal]{--_viewport-overflow: auto hidden}:host{--_vertical-inset-block-start: var(--_scrollbar-container-offset-px);--_vertical-inset-block-end: var(--_scrollbar-container-offset-px);--_horizontal-inline-start: var(--_scrollbar-container-offset-px);--_horizontal-inline-end: var(--_scrollbar-container-offset-px);--_scrollbar-grid-template: ". scrollbar-y" 1fr "scrollbar-x ." auto / 1fr auto;--_scrollbar-wrapper-y-start: initial;--_scrollbar-wrapper-y-end: 0;--_scrollbar-wrapper-x-top: initial;--_scrollbar-wrapper-x-bottom: 0}:host[position=invertY]{--_scrollbar-grid-template: "scrollbar-y ." 1fr ". scrollbar-x" auto / auto 1fr}:host[position=invertX]{--_scrollbar-grid-template: "scrollbar-x ." auto ". scrollbar-y" 1fr / 1fr auto}:host[position=invertAll]{--_scrollbar-grid-template: ". scrollbar-x" auto "scrollbar-y ." 1fr / auto 1fr }:host{--_horizontal-block-start: initial;--_horizontal-block-end: var(--_scrollbar-container-offset-px)}:host:is([position=invertX],[position=invertAll]){--_horizontal-block-start: var(--_scrollbar-container-offset-px);--_horizontal-block-end: initial;--_scrollbar-wrapper-x-top: 0;--_scrollbar-wrapper-x-bottom: initial}:host{--_vertical-inset-inline-end: var(--_scrollbar-container-offset-px);--_vertical-inset-inline-start: initial}:host:is([position=invertY],[position=invertAll]){--_vertical-inset-inline-start: var(--_scrollbar-container-offset-px);--_vertical-inset-inline-end: initial;--_scrollbar-wrapper-y-start: 0;--_scrollbar-wrapper-y-end: initial}:host[verticalUsed=true][horizontalUsed=true]{--_scrollbar-thickness-margin-px: calc(var(--_scrollbar-track-thickness-px) + var(--_scrollbar-container-offset-px) * 3)}:host[horizontalUsed=true]{--_vertical-inset-block-start: var(--_scrollbar-container-offset-px);--_vertical-inset-block-end: var(--_scrollbar-thickness-margin-px)}:host[horizontalUsed=true]:is([position=invertX],[position=invertAll]){--_vertical-inset-block-start: var(--_scrollbar-thickness-margin-px);--_vertical-inset-block-end: var(--_scrollbar-container-offset-px)}:host[verticalUsed=true]{--_horizontal-inline-start: var(--_scrollbar-container-offset-px);--_horizontal-inline-end: var(--_scrollbar-thickness-margin-px)}:host[verticalUsed=true]:is([position=invertY],[position=invertAll]){--_horizontal-inline-start: var(--_scrollbar-thickness-margin-px);--_horizontal-inline-end: var(--_scrollbar-container-offset-px)}:host{--_viewport-padding-block-start: 0;--_viewport-padding-block-end: 0;--_viewport-padding-inline-start: 0;--_viewport-padding-inline-end: 0}:host[appearance=native][verticalUsed=true]{--_viewport-padding-inline-start: 0;--_viewport-padding-inline-end: var(--_scrollbar-total-thickness-px)}:host[appearance=native][verticalUsed=true]:is([position=invertY],[position=invertAll]){--_viewport-padding-inline-start: var(--_scrollbar-total-thickness-px);--_viewport-padding-inline-end: 0}:host[appearance=native][horizontalUsed=true]{--_viewport-padding-block-start: 0;--_viewport-padding-block-end: var(--_scrollbar-total-thickness-px)}:host[appearance=native][horizontalUsed=true]:is([position=invertX],[position=invertAll]){--_viewport-padding-block-start: var(--_scrollbar-total-thickness-px);--_viewport-padding-block-end: 0}:host{--_horizontal-thumb-display: block;--_vertical-thumb-display: block}:host[isVerticallyScrollable=false]{--_vertical-thumb-display: none}:host[isHorizontallyScrollable=false]{--_horizontal-thumb-display: none}:host[visibility=hover]{--_scrollbar-hover-opacity: 0;--_scrollbar-opacity-transition: opacity var(--scrollbar-hover-opacity-transition-leave-duration, .4s) var(--scrollbar-hover-opacity-transition-leave-delay, 1s)}:host[visibility=hover][scrolling=true],:host[visibility=hover]:hover,:host[visibility=hover]:active,:host[visibility=hover]:focus{--_scrollbar-hover-opacity: 1;--_scrollbar-opacity-transition: opacity var(--scrollbar-hover-opacity-transition-enter-duration, 0)}:host{--_viewport_scroll-timeline: unset;--_animation-timeline-y: unset;--_scrollbar-thumb-transform-from: unset;--_scrollbar-thumb-transform-to: unset}:host[verticalUsed=true]{--_timeline-scope: --scrollerY;--_animation-timeline-y: --scrollerY;--_viewport_scroll-timeline: --scrollerY y}:host[horizontalUsed=true]{--_timeline-scope: --scrollerX;--_animation-timeline-x: --scrollerX;--_viewport_scroll-timeline: --scrollerX x}:host[verticalUsed=true][horizontalUsed=true]{--_timeline-scope: --scrollerX, --scrollerY;--_viewport_scroll-timeline: --scrollerX x, --scrollerY y}:host{scroll-timeline:var(--_viewport_scroll-timeline);--_scrollbar-hover-thickness-px: var(--scrollbar-track-hover-thickness, var(--_scrollbar-track-thickness-px));--_scrollbar-active-thickness-px: var(--scrollbar-track-active-thickness, var(--_scrollbar-hover-thickness-px));--_track-y-thickness-px: var(--_scrollbar-track-thickness-px);--_track-x-thickness-px: var(--_scrollbar-track-thickness-px);-webkit-user-select:var(--_viewport-user-select);user-select:var(--_viewport-user-select)}:host[dragging=x],:host[dragging=y]{--_viewport-user-select: none}:host[dragging=x]{--_track-x-thickness-px: var(--_scrollbar-active-thickness-px)}:host[dragging=y]{--_track-y-thickness-px: var(--_scrollbar-active-thickness-px)}:host{overscroll-behavior:var(--scrollbar-overscroll-behavior, initial)}:host[mobile=true]{overscroll-behavior:var(--scrollbar-mobile-overscroll-behavior, none)}:host{--_viewport-pointer-events: auto;--_scrollbar-y-pointer-events: auto;--_scrollbar-x-pointer-events: auto;pointer-events:var(--_viewport-pointer-events)}:host[disableInteraction=true]{--_viewport-pointer-events: none;--_scrollbar-y-pointer-events: none;--_scrollbar-x-pointer-events: none}:host[isVerticallyScrollable=false]{--_scrollbar-y-pointer-events: none}:host[isHorizontallyScrollable=false]{--_scrollbar-x-pointer-events: none}:host{--_scrollbar-thumb-color: var(--scrollbar-thumb-color, #1e90ff);--_scrollbar-thumb-hover-color: var(--scrollbar-thumb-hover-color, var(--_scrollbar-thumb-color));--_scrollbar-thumb-active-color: var(--scrollbar-thumb-active-color, var(--_scrollbar-thumb-hover-color));--_scrollbar-button-color: var(--scrollbar-button-color, transparent);--_scrollbar-button-hover-color: var(--scrollbar-button-hover-color, var(--_scrollbar-button-color));--_scrollbar-button-active-color: var(--scrollbar-button-active-color, var(--_scrollbar-button-hover-color));--_scrollbar-button-inactive-color: var(--scrollbar-button-inactive-color, color-mix(in srgb, var(--_scrollbar-button-color), #000 35%));--_scrollbar-button-fill: var(--scrollbar-button-fill, var(--_scrollbar-thumb-color));--_scrollbar-button-hover-fill: var(--scrollbar-button-hover-fill, var(--_scrollbar-thumb-hover-color));--_scrollbar-button-active-fill: var(--scrollbar-button-active-fill, var(--_scrollbar-thumb-active-color));--_scrollbar-button-inactive-fill: var(--scrollbar-button-inactive-fill, color-mix(in srgb, var(--_scrollbar-button-fill), #000 35%))}@layer default{:host{display:block;max-height:100%;max-width:100%}}\n']
    }]
  }], () => [], {
    contentWrapper: [{
      type: ViewChild,
      args: [forwardRef(() => ScrollContent), __spreadProps(__spreadValues({}, {
        read: ElementRef
      }), {
        isSignal: true
      })]
    }]
  });
})();
var NgScrollbarExt = class _NgScrollbarExt {
  appRef = inject(ApplicationRef);
  injector = inject(Injector);
  adapter = inject(ViewportAdapter);
  nativeElement = inject(ElementRef).nativeElement;
  viewportRef;
  /**
   * Selector used to query the viewport element.
   */
  externalViewport = input.required(...ngDevMode ? [{
    debugName: "externalViewport"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Selector used to query the content wrapper element.
   */
  externalContentWrapper = input(...ngDevMode ? [void 0, {
    debugName: "externalContentWrapper"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Selector used to query the spacer element (virtual scroll integration).
   * In the case of integrating the scrollbar with a virtual scroll component,
   * a spacer element is typically created to match the real size of the content.
   * The scrollbar will use the size of this spacer element for calculations instead of the content wrapper size.
   */
  externalSpacer = input(...ngDevMode ? [void 0, {
    debugName: "externalSpacer"
  }] : (
    /* istanbul ignore next */
    []
  ));
  viewportElement = linkedSignal(__spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "viewportElement"
  } : (
    /* istanbul ignore next */
    {}
  )), {
    source: this.externalViewport,
    // If viewport selector was defined, query the element
    computation: (selector) => this._getElement(selector)
  }));
  viewportError = computed(() => {
    return !this.viewportElement() ? `[NgScrollbar]: Could not find the viewport element for the provided selector "${this.externalViewport()}"` : null;
  }, ...ngDevMode ? [{
    debugName: "viewportError"
  }] : (
    /* istanbul ignore next */
    []
  ));
  contentWrapperElement = linkedSignal(__spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "contentWrapperElement"
  } : (
    /* istanbul ignore next */
    {}
  )), {
    source: this.externalContentWrapper,
    computation: (selector) => this._getElement(selector)
  }));
  contentWrapperError = computed(() => {
    return !this.contentWrapperElement() && this.externalContentWrapper() ? `[NgScrollbar]: Content wrapper element not found for the provided selector "${this.externalContentWrapper()}"` : null;
  }, ...ngDevMode ? [{
    debugName: "contentWrapperError"
  }] : (
    /* istanbul ignore next */
    []
  ));
  spacerElement = linkedSignal(__spreadProps(__spreadValues({}, ngDevMode ? {
    debugName: "spacerElement"
  } : (
    /* istanbul ignore next */
    {}
  )), {
    source: this.externalSpacer,
    computation: (selector) => this._getElement(selector)
  }));
  spacerError = computed(() => {
    return !this.spacerElement() && this.externalSpacer() ? `[NgScrollbar]: Spacer element not found for the provided selector "${this.externalSpacer()}"` : null;
  }, ...ngDevMode ? [{
    debugName: "spacerError"
  }] : (
    /* istanbul ignore next */
    []
  ));
  /**
   * Skip initializing the viewport and the scrollbar
   * this is used when the component needs to wait for 3rd party library to render
   */
  skipInit = false;
  constructor() {
    afterNextRender({
      earlyRead: () => {
        if (this.skipInit) return;
        const viewportElement = this.viewportElement();
        const contentWrapperElement = this.contentWrapperElement();
        const spacerElement = this.spacerElement();
        const viewportError = this.viewportError();
        const contentWrapperError = this.contentWrapperError();
        const spacerError = this.spacerError();
        untracked(() => {
          const error = viewportError || contentWrapperError || spacerError;
          if (error) {
            console.error(error);
          } else {
            this.initialize(viewportElement, contentWrapperElement, spacerElement);
          }
        });
      }
    });
  }
  ngOnDestroy() {
    this._destroy();
  }
  initialize(viewportElement, contentWrapperElement, spacerElement) {
    this.viewportRef = createComponent(ScrollViewport, {
      hostElement: viewportElement,
      projectableNodes: [Array.from(viewportElement.childNodes)],
      environmentInjector: this.appRef.injector,
      elementInjector: this.injector,
      bindings: [inputBinding("contentWrapperElement", () => contentWrapperElement), inputBinding("spacerElement", () => spacerElement)]
    });
    this.appRef.attachView(this.viewportRef.hostView);
  }
  _destroy() {
    if (this.viewportRef) {
      this.appRef.detachView(this.viewportRef.hostView);
      this.viewportRef.destroy();
      this.viewportRef = null;
    }
  }
  _getElement(selector) {
    return selector ? this.nativeElement.querySelector(selector) : null;
  }
  /**
   * Smooth scroll functions
   */
  scrollTo(options) {
    return this.adapter.scrollTo(options);
  }
  /**
   * Scroll to an element by reference or selector
   */
  scrollToElement(target, options) {
    return this.adapter.scrollToElement(target, options);
  }
  static ɵfac = function NgScrollbarExt_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgScrollbarExt)();
  };
  static ɵcmp = ɵɵdefineComponent({
    type: _NgScrollbarExt,
    selectors: [["ng-scrollbar", "externalViewport", ""]],
    inputs: {
      externalViewport: [1, "externalViewport"],
      externalContentWrapper: [1, "externalContentWrapper"],
      externalSpacer: [1, "externalSpacer"]
    },
    exportAs: ["ngScrollbar"],
    features: [ɵɵHostDirectivesFeature([{
      directive: ViewportAdapter,
      inputs: ["position", "position", "withButtons", "withButtons", "appearance", "appearance", "thumbClass", "thumbClass", "trackClass", "trackClass", "buttonClass", "buttonClass", "visibility", "visibility", "hoverOffset", "hoverOffset", "orientation", "orientation", "disableSensor", "disableSensor", "sensorThrottleTime", "sensorThrottleTime", "disableInteraction", "disableInteraction", "trackScrollDuration", "trackScrollDuration"],
      outputs: ["afterInit", "afterInit", "afterUpdate", "afterUpdate"]
    }])],
    ngContentSelectors: _c0,
    decls: 1,
    vars: 0,
    template: function NgScrollbarExt_Template(rf, ctx) {
      if (rf & 1) {
        ɵɵprojectionDef();
        ɵɵprojection(0);
      }
    },
    encapsulation: 2
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgScrollbarExt, [{
    type: Component,
    args: [{
      selector: "ng-scrollbar[externalViewport]",
      exportAs: "ngScrollbar",
      template: "<ng-content/>",
      changeDetection: ChangeDetectionStrategy.OnPush,
      hostDirectives: [{
        directive: ViewportAdapter,
        inputs: ["position", "withButtons", "appearance", "thumbClass", "trackClass", "buttonClass", "visibility", "hoverOffset", "orientation", "disableSensor", "sensorThrottleTime", "disableInteraction", "trackScrollDuration"],
        outputs: ["afterInit", "afterUpdate"]
      }]
    }]
  }], () => [], {
    externalViewport: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "externalViewport",
        required: true
      }]
    }],
    externalContentWrapper: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "externalContentWrapper",
        required: false
      }]
    }],
    externalSpacer: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "externalSpacer",
        required: false
      }]
    }]
  });
})();
var NgScrollbarAsyncViewport = class _NgScrollbarAsyncViewport {
  scrollbar = inject(NgScrollbarExt, {
    self: true
  });
  contentObserver = inject(ContentObserver);
  asyncViewport = input.required(...ngDevMode ? [{
    debugName: "asyncViewport"
  }] : (
    /* istanbul ignore next */
    []
  ));
  constructor() {
    this.scrollbar.skipInit = true;
    let sub$;
    let init;
    effect((onCleanup) => {
      const externalViewport = this.scrollbar.externalViewport();
      const externalContentWrapper = this.scrollbar.externalContentWrapper();
      const externalSpacer = this.scrollbar.externalSpacer();
      const asyncDetection = this.asyncViewport();
      sub$ = this.contentObserver.observe(this.scrollbar.nativeElement).pipe(throttleTime(100, null, {
        leading: true,
        trailing: true
      })).subscribe(() => {
        this.scrollbar.viewportElement.set(this.scrollbar._getElement(externalViewport));
        this.scrollbar.contentWrapperElement.set(this.scrollbar._getElement(externalContentWrapper));
        this.scrollbar.spacerElement.set(this.scrollbar._getElement(externalSpacer));
        const contentWrapperCheck = externalContentWrapper ? !!this.scrollbar.contentWrapperElement() : true;
        const spacerPassCheck = externalSpacer ? !!this.scrollbar.spacerElement() : true;
        if (!init && this.scrollbar.viewportElement() && contentWrapperCheck && spacerPassCheck) {
          this.scrollbar.initialize(this.scrollbar.viewportElement(), this.scrollbar.contentWrapperElement(), this.scrollbar.spacerElement());
          init = true;
        } else if (!this.scrollbar.viewportElement() || externalContentWrapper && !this.scrollbar.contentWrapperElement() || externalSpacer && !this.scrollbar.spacerElement()) {
          this.scrollbar._destroy();
          init = false;
        }
        if (asyncDetection !== "auto") {
          sub$.unsubscribe();
        }
      });
      onCleanup(() => sub$?.unsubscribe());
    });
  }
  static ɵfac = function NgScrollbarAsyncViewport_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgScrollbarAsyncViewport)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NgScrollbarAsyncViewport,
    selectors: [["ng-scrollbar", "externalViewport", "", "asyncViewport", ""]],
    inputs: {
      asyncViewport: [1, "asyncViewport"]
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgScrollbarAsyncViewport, [{
    type: Directive,
    args: [{
      selector: "ng-scrollbar[externalViewport][asyncViewport]"
    }]
  }], () => [], {
    asyncViewport: [{
      type: Input,
      args: [{
        isSignal: true,
        alias: "asyncViewport",
        required: true
      }]
    }]
  });
})();
var NgSyncSpacer = class _NgSyncSpacer {
  sharedResizeObserver = inject(SharedResizeObserver);
  scrollbar = inject(NgScrollbarExt, {
    self: true
  });
  viewport = inject(ViewportAdapter, {
    self: true
  });
  /**
   * A signal used to sync spacer dimension when content dimension changes
   */
  spacerDimension = signal({}, ...ngDevMode ? [{
    debugName: "spacerDimension"
  }] : (
    /* istanbul ignore next */
    []
  ));
  constructor() {
    let resizeSub$;
    effect((onCleanup) => {
      const throttleDuration = this.viewport.sensorThrottleTime();
      const disableSensor = this.viewport.disableSensor();
      const contentWrapperElement = this.scrollbar.contentWrapperElement();
      const spacerElement = this.scrollbar.spacerElement();
      untracked(() => {
        if (!disableSensor && contentWrapperElement && spacerElement) {
          resizeSub$ = getThrottledStream(this.sharedResizeObserver.observe(contentWrapperElement), throttleDuration).subscribe(() => {
            requestAnimationFrame(() => {
              this.spacerDimension.set({
                width: contentWrapperElement.offsetWidth,
                height: contentWrapperElement.offsetHeight
              });
            });
          });
        }
        onCleanup(() => resizeSub$?.unsubscribe());
      });
    });
  }
  static ɵfac = function NgSyncSpacer_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgSyncSpacer)();
  };
  static ɵdir = ɵɵdefineDirective({
    type: _NgSyncSpacer,
    selectors: [["ng-scrollbar", "externalViewport", "", "syncSpacer", ""]],
    hostVars: 4,
    hostBindings: function NgSyncSpacer_HostBindings(rf, ctx) {
      if (rf & 2) {
        ɵɵstyleProp("--_spacer-width", ctx.spacerDimension().width)("--_spacer-height", ctx.spacerDimension().height);
      }
    }
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgSyncSpacer, [{
    type: Directive,
    args: [{
      selector: "ng-scrollbar[externalViewport][syncSpacer]",
      host: {
        "[style.--_spacer-width]": "spacerDimension().width",
        "[style.--_spacer-height]": "spacerDimension().height"
      }
    }]
  }], () => [], null);
})();
var NgScrollbarModule = class _NgScrollbarModule {
  static ɵfac = function NgScrollbarModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgScrollbarModule)();
  };
  static ɵmod = ɵɵdefineNgModule({
    type: _NgScrollbarModule,
    imports: [NgScrollbar, NgScrollbarExt, NgScrollbarAsyncViewport, NgSyncSpacer],
    exports: [NgScrollbar, NgScrollbarExt, NgScrollbarAsyncViewport, NgSyncSpacer]
  });
  static ɵinj = ɵɵdefineInjector({});
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgScrollbarModule, [{
    type: NgModule,
    args: [{
      imports: [NgScrollbar, NgScrollbarExt, NgScrollbarAsyncViewport, NgSyncSpacer],
      exports: [NgScrollbar, NgScrollbarExt, NgScrollbarAsyncViewport, NgSyncSpacer]
    }]
  }], null, null);
})();
function provideScrollbarOptions(options) {
  return [{
    provide: NG_SCROLLBAR_OPTIONS,
    useValue: __spreadValues(__spreadValues({}, defaultOptions), options)
  }];
}
function provideScrollbarPolyfill(url) {
  return makeEnvironmentProviders([{
    provide: NG_SCROLLBAR_POLYFILL,
    useValue: url
  }]);
}
var NgScrollbarAnywhere = class _NgScrollbarAnywhere {
  document = inject(DOCUMENT);
  appRef = inject(ApplicationRef);
  environmentInjector = inject(EnvironmentInjector);
  /**
   * Generic method to create and attach a scrollbar component.
   * @param host - CSS selector for the host element.
   * @param component - The scrollbar component to create (either NgScrollbar or NgScrollbarExt).
   * @param options - Scrollbar options
   * @returns A reference to the created scrollbar component or null if the host is not found.
   */
  createScrollbarComponent(host, component, options, params) {
    const hostElement = typeof host === "string" ? this.document.querySelector(host) : coerceElement(host);
    if (!hostElement) {
      console.error(`[NgScrollbar]: Could not find the host element!`);
      return null;
    }
    let componentRef = createComponent(component, {
      hostElement,
      environmentInjector: this.environmentInjector,
      projectableNodes: [Array.from(hostElement.childNodes)],
      elementInjector: Injector.create({
        providers: [provideScrollbarOptions(options)]
      }),
      bindings: params ? [inputBinding("externalViewport", () => params.viewport), inputBinding("externalContentWrapper", () => params.contentWrapper), inputBinding("externalSpacer", () => params.spacer)] : null
    });
    this.appRef.attachView(componentRef.hostView);
    return {
      componentRef,
      destroy: () => {
        this.appRef.detachView(componentRef.hostView);
        componentRef.destroy();
        componentRef = null;
      }
    };
  }
  /**
   * Creates a basic scrollbar for a given host element.
   * @param host - CSS selector for the target element.
   * @param options - Scrollbar options
   * @returns A reference to the created scrollbar component.
   */
  createScrollbar(host, options) {
    return this.createScrollbarComponent(host, NgScrollbar, options);
  }
  /**
   * Creates an extended scrollbar with external viewport and optional configurations.
   * @param params - Configuration options including host, viewport, and optional elements.
   * @param options - Scrollbar options
   * @returns A reference to the created extended scrollbar component.
   */
  createScrollbarExt(params, options) {
    return this.createScrollbarComponent(params.host, NgScrollbarExt, options, params);
  }
  static ɵfac = function NgScrollbarAnywhere_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgScrollbarAnywhere)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _NgScrollbarAnywhere,
    factory: _NgScrollbarAnywhere.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgScrollbarAnywhere, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
var NgScrollbarDocument = class _NgScrollbarDocument {
  document = inject(DOCUMENT);
  injector = inject(Injector);
  appRef = inject(ApplicationRef);
  attachScrollbar(options) {
    const viewport = this.document.documentElement;
    const contentWrapper = this.document.body;
    const scrollbarRef = createComponent(ScrollViewport, {
      hostElement: viewport,
      environmentInjector: this.appRef.injector,
      projectableNodes: [Array.from(viewport.childNodes)],
      elementInjector: Injector.create({
        parent: this.injector,
        providers: [ViewportAdapter, provideScrollbarOptions(options)]
      }),
      bindings: [inputBinding("contentWrapperElement", () => contentWrapper)]
    });
    this.appRef.attachView(scrollbarRef.hostView);
    return scrollbarRef;
  }
  static ɵfac = function NgScrollbarDocument_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NgScrollbarDocument)();
  };
  static ɵprov = ɵɵdefineInjectable({
    token: _NgScrollbarDocument,
    factory: _NgScrollbarDocument.ɵfac,
    providedIn: "root"
  });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgScrollbarDocument, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
export {
  NG_SCROLLBAR_OPTIONS,
  NG_SCROLLBAR_POLYFILL,
  NgScrollbar,
  NgScrollbarAnywhere,
  NgScrollbarAsyncViewport,
  NgScrollbarDocument,
  NgScrollbarExt,
  NgScrollbarModule,
  NgSyncSpacer,
  ScrollbarInputOutputs,
  ScrollbarUpdateReason,
  ViewportAdapter,
  provideScrollbarOptions,
  provideScrollbarPolyfill
};
//# sourceMappingURL=ngx-scrollbar.js.map
