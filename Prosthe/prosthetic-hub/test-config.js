const OpenClawConfigManager = require('./src/lib/openclaw-config.js');

console.log('Testing OpenClawConfigManager...');

const config = OpenClawConfigManager.readConfig();
console.log('Config loaded. Current skills:', Object.keys(config?.skills?.entries || {}));

console.log('Adding test skill...');
OpenClawConfigManager.updateSkill('test-tavily', { apiKey: 'dummy-key-for-testing' });

const updatedConfig = OpenClawConfigManager.readConfig();
console.log('Skill added. Updated skills:', Object.keys(updatedConfig?.skills?.entries || {}));
