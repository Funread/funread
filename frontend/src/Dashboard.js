"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styles_1 = require("@mui/material/styles");
var CssBaseline_1 = require("@mui/material/CssBaseline");
var Drawer_1 = require("@mui/material/Drawer");
var Box_1 = require("@mui/material/Box");
var AppBar_1 = require("@mui/material/AppBar");
var Toolbar_1 = require("@mui/material/Toolbar");
var List_1 = require("@mui/material/List");
var Typography_1 = require("@mui/material/Typography");
var Divider_1 = require("@mui/material/Divider");
var IconButton_1 = require("@mui/material/IconButton");
var Badge_1 = require("@mui/material/Badge");
var Container_1 = require("@mui/material/Container");
var Grid_1 = require("@mui/material/Grid");
var Paper_1 = require("@mui/material/Paper");
var Link_1 = require("@mui/material/Link");
var Menu_1 = require("@mui/icons-material/Menu");
var ChevronLeft_1 = require("@mui/icons-material/ChevronLeft");
var Notifications_1 = require("@mui/icons-material/Notifications");
var ListItems_1 = require("./Components/Shared/ListItems");
var Chart_1 = require("./Components/Shared/Chart");
var Deposits_1 = require("./Components/Shared/Deposits");
var Orders_1 = require("./Components/Shared/Orders");
function Copyright(props) {
    return (React.createElement(Typography_1.default, __assign({ variant: "body2", color: "text.secondary", align: "center" }, props),
        'Copyright © ',
        React.createElement(Link_1.default, { color: "inherit", href: "https://mui.com/" }, "Your Website"),
        ' ',
        new Date().getFullYear(),
        '.'));
}
var drawerWidth = 240;
var AppBar = styles_1.styled(AppBar_1.default, {
    shouldForwardProp: function (prop) { return prop !== 'open'; },
})(function (_a) {
    var theme = _a.theme, open = _a.open;
    return (__assign({ zIndex: theme.zIndex.drawer + 1, transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }) }, (open && {
        marginLeft: drawerWidth,
        width: "calc(100% - " + drawerWidth + "px)",
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    })));
});
var Drawer = styles_1.styled(Drawer_1.default, { shouldForwardProp: function (prop) { return prop !== 'open'; } })(function (_a) {
    var _b;
    var theme = _a.theme, open = _a.open;
    return ({
        '& .MuiDrawer-paper': __assign({ position: 'relative', whiteSpace: 'nowrap', width: drawerWidth, transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }), boxSizing: 'border-box' }, (!open && (_b = {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7)
            },
            _b[theme.breakpoints.up('sm')] = {
                width: theme.spacing(9),
            },
            _b))),
    });
});
var mdTheme = styles_1.createTheme();
function DashboardContent() {
    var _a = React.useState(true), open = _a[0], setOpen = _a[1];
    var toggleDrawer = function () {
        setOpen(!open);
    };
    return (React.createElement(styles_1.ThemeProvider, { theme: mdTheme },
        React.createElement(Box_1.default, { sx: { display: 'flex' } },
            React.createElement(CssBaseline_1.default, null),
            React.createElement(AppBar, { position: "absolute", open: open },
                React.createElement(Toolbar_1.default, { sx: {
                        pr: '24px', // keep right padding when drawer closed
                    } },
                    React.createElement(IconButton_1.default, { edge: "start", color: "inherit", "aria-label": "open drawer", onClick: toggleDrawer, sx: __assign({ marginRight: '36px' }, (open && { display: 'none' })) },
                        React.createElement(Menu_1.default, null)),
                    React.createElement(Typography_1.default, { component: "h1", variant: "h6", color: "inherit", noWrap: true, sx: { flexGrow: 1 } }, "Dashboard"),
                    React.createElement(IconButton_1.default, { color: "inherit" },
                        React.createElement(Badge_1.default, { badgeContent: 4, color: "secondary" },
                            React.createElement(Notifications_1.default, null))))),
            React.createElement(Drawer, { variant: "permanent", open: open },
                React.createElement(Toolbar_1.default, { sx: {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'flex-end',
                        px: [1],
                    } },
                    React.createElement(IconButton_1.default, { onClick: toggleDrawer },
                        React.createElement(ChevronLeft_1.default, null))),
                React.createElement(Divider_1.default, null),
                React.createElement(List_1.default, { component: "nav" },
                    ListItems_1.mainListItems,
                    React.createElement(Divider_1.default, { sx: { my: 1 } }),
                    ListItems_1.secondaryListItems)),
            React.createElement(Box_1.default, { component: "main", sx: {
                    backgroundColor: function (theme) {
                        return theme.palette.mode === 'light'
                            ? theme.palette.grey[100]
                            : theme.palette.grey[900];
                    },
                    flexGrow: 1,
                    height: '100vh',
                    overflow: 'auto',
                } },
                React.createElement(Toolbar_1.default, null),
                React.createElement(Container_1.default, { maxWidth: "lg", sx: { mt: 4, mb: 4 } },
                    React.createElement(Grid_1.default, { container: true, spacing: 3 },
                        React.createElement(Grid_1.default, { item: true, xs: 12, md: 8, lg: 9 },
                            React.createElement(Paper_1.default, { sx: {
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                } },
                                React.createElement(Chart_1.default, null))),
                        React.createElement(Grid_1.default, { item: true, xs: 12, md: 4, lg: 3 },
                            React.createElement(Paper_1.default, { sx: {
                                    p: 2,
                                    display: 'flex',
                                    flexDirection: 'column',
                                    height: 240,
                                } },
                                React.createElement(Deposits_1.default, null))),
                        React.createElement(Grid_1.default, { item: true, xs: 12 },
                            React.createElement(Paper_1.default, { sx: { p: 2, display: 'flex', flexDirection: 'column' } },
                                React.createElement(Orders_1.default, null)))),
                    React.createElement(Copyright, { sx: { pt: 4 } }))))));
}
function Dashboard() {
    return React.createElement(DashboardContent, null);
}
exports.default = Dashboard;
//# sourceMappingURL=Dashboard.js.map