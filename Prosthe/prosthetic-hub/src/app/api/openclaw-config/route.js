import { NextResponse } from 'next/server';
import OpenClawConfigManager from '../../../lib/openclaw-config';

export async function GET() {
    try {
        const config = OpenClawConfigManager.readConfig();
        if (!config) {
            return NextResponse.json({ error: 'Config not found' }, { status: 404 });
        }
        return NextResponse.json({
            skills: config.skills?.entries || {},
            plugins: config.plugins?.entries || {},
        });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const body = await request.json();
        const { action, name, data } = body;

        if (!action || !name || !data) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        let success = false;
        if (action === 'update_skill') {
            success = OpenClawConfigManager.updateSkill(name, data);
        } else if (action === 'update_plugin') {
            success = OpenClawConfigManager.updatePlugin(name, data);
        } else {
            return NextResponse.json({ error: 'Invalid action' }, { status: 400 });
        }

        if (success) {
            return NextResponse.json({ success: true, message: `${action} successful for ${name}` });
        } else {
            return NextResponse.json({ error: 'Failed to update config' }, { status: 500 });
        }
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
