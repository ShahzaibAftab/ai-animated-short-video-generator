import Replicate from "replicate";
export default async function handler(req, res) {
    const replicate = new Replicate({
        auth: process.env.REPLICATE_API_TOKEN,
    });
    console.log(req.body.prompt)
    console.log(process.env.REPLICATE_API_TOKEN)
    try {
        const output = await replicate.run("deforum/deforum_stable_diffusion:e22e77495f2fb83c34d5fae2ad8ab63c0a87b6b573b6208e1535b23b89ea66d6", {
            input: {
                max_frame: 100,
                animation_prompts: req.body.prompt
            }
        });
        res.status(200).json({ video: output });
    } catch (error) {
        console.log('AI video generation failed', error);
        res.status(500).json({ error: "AI video generation failed" })
    }
}