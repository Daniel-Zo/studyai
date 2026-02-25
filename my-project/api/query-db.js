// 引入 Supabase 客户端（Vercel 会自动安装依赖）
import { createClient } from '@supabase/supabase-js';

// 初始化 Supabase 客户端（替换为你的 URL 和 KEY）
const supabaseUrl = "https://zhlynogiflwfupkvrune.supabase.co";
const supabaseAnonKey = "sb_publishable_Q8mIQ3u6oBxuFWHK0QjukA_U7MhR4DK";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 后端接口的核心逻辑
export default async function handler(req, res) {
    // 设置跨域（允许前端访问）
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET');

    try {
        // 获取前端传入的姓名参数
        const { name } = req.query;
        if (!name) {
            return res.status(400).json({
                success: false,
                message: "请传入姓名参数"
            });
        }

        // 查询 Supabase 数据库
        const { data, error } = await supabase
            .from('user_info')
            .select('*')
            .eq('name', name); // 按姓名精准查询

        if (error) throw error;

        // 返回查询结果给前端
        res.status(200).json({
            success: true,
            data: data || []
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }

}
