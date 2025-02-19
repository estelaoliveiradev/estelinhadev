async function getTempViteServer({ viteConfig }: { viteConfig: UserConfig }) { 
    const tempViteServer = await createServer( 
        mergeConfig(viteConfig, { 
            server: { middlewareMode: true, hmr: false, watch: null }, 
            optimizeDeps: { noDiscovery: true }, 
            ssr: { external: [] }, 
            logLevel: 'silent', 
        }) 
    ); 
 
    const hotSend = tempViteServer.hot.send; 
    tempViteServer.hot.send = (payload: HMRPayload) => { 
        if (payload.type === 'error') { 
            throw payload.err; 
        } 
        return hotSend(payload); 
    }; 
 
    return tempViteServer; 
} 