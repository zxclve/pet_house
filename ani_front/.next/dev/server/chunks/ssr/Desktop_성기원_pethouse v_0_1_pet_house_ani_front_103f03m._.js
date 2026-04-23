module.exports = [
"[project]/Desktop/성기원/pethouse v.0.1/pet_house/ani_front/app/contracts/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>ContractsPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f_c131$$_ae30$$_c6d0$$2f$pethouse__v$2e$0$2e$1$2f$pet_house$2f$ani_front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/성기원/pethouse v.0.1/pet_house/ani_front/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f_c131$$_ae30$$_c6d0$$2f$pethouse__v$2e$0$2e$1$2f$pet_house$2f$ani_front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/Desktop/성기원/pethouse v.0.1/pet_house/ani_front/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
(()=>{
    const e = new Error("Cannot find module '@/services/contractsApi'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/contracts/ContractHeader'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/contracts/ContractSearch'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
(()=>{
    const e = new Error("Cannot find module '@/components/contracts/ContractTable'");
    e.code = 'MODULE_NOT_FOUND';
    throw e;
})();
"use client";
;
;
;
;
;
;
function ContractsPage() {
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f_c131$$_ae30$$_c6d0$$2f$pethouse__v$2e$0$2e$1$2f$pet_house$2f$ani_front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const loadData = async (status = "A")=>{
        const res = await fetchContracts({
            type: "A",
            status
        });
        setData(res);
    };
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f_c131$$_ae30$$_c6d0$$2f$pethouse__v$2e$0$2e$1$2f$pet_house$2f$ani_front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        loadData("A"); // 기본 분양정보
    }, []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f_c131$$_ae30$$_c6d0$$2f$pethouse__v$2e$0$2e$1$2f$pet_house$2f$ani_front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "p-6 space-y-6",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f_c131$$_ae30$$_c6d0$$2f$pethouse__v$2e$0$2e$1$2f$pet_house$2f$ani_front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                className: "text-2xl font-bold",
                children: "분양계약서 작성 (관리자용)"
            }, void 0, false, {
                fileName: "[project]/Desktop/성기원/pethouse v.0.1/pet_house/ani_front/app/contracts/page.tsx",
                lineNumber: 30,
                columnNumber: 7
            }, this),
            data?.post && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f_c131$$_ae30$$_c6d0$$2f$pethouse__v$2e$0$2e$1$2f$pet_house$2f$ani_front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ContractHeader, {
                post: data.post
            }, void 0, false, {
                fileName: "[project]/Desktop/성기원/pethouse v.0.1/pet_house/ani_front/app/contracts/page.tsx",
                lineNumber: 36,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f_c131$$_ae30$$_c6d0$$2f$pethouse__v$2e$0$2e$1$2f$pet_house$2f$ani_front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ContractSearch, {
                onSearch: loadData
            }, void 0, false, {
                fileName: "[project]/Desktop/성기원/pethouse v.0.1/pet_house/ani_front/app/contracts/page.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$Desktop$2f_c131$$_ae30$$_c6d0$$2f$pethouse__v$2e$0$2e$1$2f$pet_house$2f$ani_front$2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(ContractTable, {
                contracts: data?.contracts || []
            }, void 0, false, {
                fileName: "[project]/Desktop/성기원/pethouse v.0.1/pet_house/ani_front/app/contracts/page.tsx",
                lineNumber: 43,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/Desktop/성기원/pethouse v.0.1/pet_house/ani_front/app/contracts/page.tsx",
        lineNumber: 27,
        columnNumber: 5
    }, this);
}
}),
"[project]/Desktop/성기원/pethouse v.0.1/pet_house/ani_front/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/Desktop/성기원/pethouse v.0.1/pet_house/ani_front/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime;
}),
];

//# sourceMappingURL=Desktop_%EC%84%B1%EA%B8%B0%EC%9B%90_pethouse%20v_0_1_pet_house_ani_front_103f03m._.js.map