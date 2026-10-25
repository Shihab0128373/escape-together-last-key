const express=require('express'),http=require('http'),{Server}=require('socket.io'),path=require('path');
const app=express(),server=http.createServer(app),io=new Server(server,{cors:{origin:'*'}});
app.use(express.static(path.join(__dirname,'public')));app.get('/health',(_,r)=>r.json({ok:true,game:'Escape Together: The Last Key'}));
const rooms=new Map(),clamp=v=>Math.max(-5,Math.min(5,Number(v)||0));
io.on('connection',s=>{
s.on('joinRoom',({room,name})=>{if(!room)return;let id=String(room).slice(0,12).toUpperCase(),d=rooms.get(id)||{players:{}};rooms.set(id,d);if(Object.keys(d.players).length>=2&&!d.players[s.id])return s.emit('roomFull');for(const r of s.rooms)if(r!==s.id)s.leave(r);s.join(id);s.data.room=id;d.players[s.id]={x:0,z:0,name:String(name||'Player').slice(0,18)};io.to(id).emit('roomState',d)});
s.on('playerUpdate',({room,state})=>{let id=s.data.room;if(!id||id!==String(room||'').toUpperCase()||!state)return;let d=rooms.get(id);if(!d||!d.players[s.id])return;let safe={x:clamp(state.x),z:clamp(state.z),vx:clamp(state.vx),vz:clamp(state.vz),name:d.players[s.id].name};d.players[s.id]=safe;s.to(id).emit('playerUpdate',{id:s.id,state:safe})});
s.on('story',({room,text})=>{let id=s.data.room;if(id&&id===String(room||'').toUpperCase())s.to(id).emit('story',{text:String(text||'').slice(0,240)})});
s.on('voiceSignal',d=>{let id=s.data.room;if(id&&id===String(d.room||'').toUpperCase()){if(d.to)io.to(d.to).emit('voiceSignal',d);else s.to(id).emit('voiceSignal',d)}});
s.on('disconnect',()=>{let id=s.data.room;if(!id||!rooms.has(id))return;let d=rooms.get(id);delete d.players[s.id];io.to(id).emit('roomState',d);if(!Object.keys(d.players).length)rooms.delete(id)});
});server.listen(process.env.PORT||3000,()=>console.log('Escape Together server started'));
