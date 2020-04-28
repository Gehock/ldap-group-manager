const MockAuth = require('./mock-auth');

module.exports = {
    // Values that are fine to use in development
    "PASSPORT_STRATEGY_NAME": "mock",
    "PASSPORT_STRATEGY": new MockAuth(),

    // Values that need to be configured depending on your dev environment
    "MOCK_AUTH_USER_OBJ": {},
    "LDAP_URL": undefined,
    "LDAP_SEARCH_BASE": undefined,
    "LDAP_ADMIN_GROUP_NAME": undefined,
    "LDAP_BIND_DN": undefined,
    "LDAP_BIND_PW": undefined,
    "MONGO_AUTHDB": undefined,
    "EXPRESS_SESSION_SECRET": undefined,
    "MONGO_USERNAME": undefined,
    "MONGO_PW": undefined,
    "MONGO_URL": undefined
}
