// 安装依赖：npm install openai dotenv
import 'dotenv/config'
import OpenAI from 'openai';
import fs from 'fs'
async function callQwenTurbo() {
  try {
    // 初始化OpenAI客户端（兼容Qwen模型）
    const client = new OpenAI({
      apiKey: process.env['LLM_API_KEY'],
        baseURL: process.env['LLM_BASE_URL']
    });

    // qwen-plus
    const model_name : string = process.env['LLM_MODEL_NAME'] || "qwen-max"
    // console.log(`model_name: ${model_name}`)
    // console.log(`LLM_API_KEY: ${process.env['LLM_API_KEY']}`)
    // console.log(`LLM_BASE_URL: ${process.env['LLM_BASE_URL']}`)

    // 调用语言模型（以文本生成为例）
    const response = await client.chat.completions.create({
      model: model_name,
      messages: [
        {
          role: "user",
          content: "请用一句话描述人工智能的发展趋势"
        }
      ],
      temperature: 0.7, // 控制输出随机性，0-1之间
      max_tokens: 100 // 最大生成token数
    });

    // 输出结果
    console.log("模型响应：", response.choices[0].message.content);
    
  } catch (error) {
    console.error("调用失败：", error);
    if (error.response) {
      console.error("状态码：", error.response.status);
      console.error("错误信息：", error.response.data);
    }
  }
}

async function callQwenVL() {
  try {
    // 初始化OpenAI客户端（兼容Qwen模型）
    const client = new OpenAI({
      apiKey: process.env['LLM_API_KEY'],
        baseURL: process.env['LLM_BASE_URL']
    });

    // qwen-vl
    const model_name : string = process.env['LLM_MODEL_NAME'] || "qwen-max"
    // console.log(`model_name: ${model_name}`)
    // console.log(`LLM_API_KEY: ${process.env['LLM_API_KEY']}`)
    // console.log(`LLM_BASE_URL: ${process.env['LLM_BASE_URL']}`)

    const imageBuffer = await fs.promises.readFile('C:/Users/dd/Desktop/Llama3_Repo.jpeg')
    const base64Image = imageBuffer.toString('base64');

    const response = await client.chat.completions.create({
        model: model_name,
        messages: [
        {
            role: "system",
            content: "You are a helpful assistant."
        },
        {
            role: "user",
            content: [
            {type: "text", text: "图中是什么动物？"},
            {type: "image_url", image_url: {url: `data:image/jpeg;base64,${base64Image}`}}
            ]
        }
        ],
        temperature: 0.7, // 控制输出随机性，0-1之间
        max_tokens: 200 // 最大生成token数
    });

    // 输出结果
    console.log("模型响应：", response.choices[0].message.content);
    
  } catch (error) {
    console.error("调用失败：", error);
    if (error.response) {
      console.error("状态码：", error.response.status);
      console.error("错误信息：", error.response.data);
    }
  }
}

async function callQwenLong() {
  try {
    // 初始化OpenAI客户端（兼容Qwen模型）
    const client = new OpenAI({
      apiKey: process.env['LLM_API_KEY'],
        baseURL: process.env['LLM_BASE_URL']
    });
    // qwen-long
    const model_name : string = process.env['LLM_MODEL_NAME'] || "qwen-max"
    // console.log(`model_name: ${model_name}`)
    // console.log(`LLM_API_KEY: ${process.env['LLM_API_KEY']}`)
    // console.log(`LLM_BASE_URL: ${process.env['LLM_BASE_URL']}`)

    const fileObj = await client.files.create({
        file: fs.createReadStream("C:/Users/dd/Desktop/aaaa.pdf"),
        purpose: "file-extract" as any,
    });

    const response = await client.chat.completions.create({
        model: model_name,
        messages: [
        {
            role: "system",
            content: "You are a helpful assistant.",
        },
        {
            role: "system",
            content: `fileid://${fileObj.id}`,
        },
        {
            role: "user",
            content: "文件里面讲什么？",
        }
        ],
        temperature: 0.7, // 控制输出随机性，0-1之间
        max_tokens: 100 // 最大生成token数
    });

    // 输出结果
    console.log("模型响应：", response.choices[0].message.content);
    
  } catch (error) {
    console.error("调用失败：", error);
    if (error.response) {
      console.error("状态码：", error.response.status);
      console.error("错误信息：", error.response.data);
    }
  }
}



// 执行调用
callQwenTurbo();