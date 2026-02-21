const fs = require('fs');
const path = require('path');
const os = require('os');

/**
 * Utility to programmatically update the OpenClaw configuration file (openclaw.json)
 * so users don't have to manually edit it.
 */
class OpenClawConfigManager {
    constructor() {
        this.configPath = path.join(os.homedir(), '.openclaw', 'openclaw.json');
    }

    /**
     * Reads the current OpenClaw configuration.
     * @returns {Object|null} The parsed configuration object, or null if it fails.
     */
    readConfig() {
        try {
            if (!fs.existsSync(this.configPath)) {
                console.error(`OpenClaw config not found at: ${this.configPath}`);
                return null;
            }
            const rawData = fs.readFileSync(this.configPath, 'utf8');
            return JSON.parse(rawData);
        } catch (error) {
            console.error('Error reading OpenClaw config:', error);
            return null;
        }
    }

    /**
     * Writes the updated configuration back to the file.
     * @param {Object} config The updated configuration object.
     * @returns {boolean} True if successful, false otherwise.
     */
    writeConfig(config) {
        try {
            // Update the meta touched timestamp
            if (!config.meta) config.meta = {};
            config.meta.lastTouchedAt = new Date().toISOString();

            fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2), 'utf8');
            console.log('Successfully updated openclaw.json');
            return true;
        } catch (error) {
            console.error('Error writing OpenClaw config:', error);
            return false;
        }
    }

    /**
     * Adds or updates a skill in the OpenClaw configuration.
     * @param {string} skillName The name of the skill (e.g., 'gh-issues', 'tavily-search').
     * @param {Object} skillData The configuration data for the skill (e.g., { apiKey: '...' }).
     */
    updateSkill(skillName, skillData) {
        const config = this.readConfig();
        if (!config) return false;

        if (!config.skills) config.skills = {};
        if (!config.skills.entries) config.skills.entries = {};

        // Update or add the skill entry
        config.skills.entries[skillName] = {
            ...config.skills.entries[skillName],
            ...skillData
        };

        return this.writeConfig(config);
    }

    /**
     * Enables or configures a plugin in the OpenClaw configuration.
     * @param {string} pluginName The name of the plugin.
     * @param {Object} pluginData The configuration data for the plugin.
     */
    updatePlugin(pluginName, pluginData) {
        const config = this.readConfig();
        if (!config) return false;

        if (!config.plugins) config.plugins = {};
        if (!config.plugins.entries) config.plugins.entries = {};

        config.plugins.entries[pluginName] = {
            ...config.plugins.entries[pluginName],
            ...pluginData,
            enabled: true // Default to enabled when updating
        };

        return this.writeConfig(config);
    }
}

module.exports = new OpenClawConfigManager();
