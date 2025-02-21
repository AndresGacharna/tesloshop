import { JwtService } from '@nestjs/jwt';
import { OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessagesWsService } from './messages-ws.service';
import { NewMessageDto } from './dto/new-message.dto';
import { JwtPayload } from 'src/auth/interfaces';

@WebSocketGateway({cors: true})
export class MessagesWsGateway implements OnGatewayConnection, OnGatewayDisconnect{
  

  @WebSocketServer() wss: Server; // Web socket server: lo vamos a usar para notificar a todos los usuarios la coneccion de un usuario
  constructor(
    private readonly messagesWsService: MessagesWsService,
    private readonly jwtService: JwtService

  ) {}

  async handleConnection(client: Socket) {
    const token = client.handshake.headers.authentication as string;
    let payload: JwtPayload
    try {
      payload= this.jwtService.verify(token);
      await this.messagesWsService.registeredClient(client, payload.id);
    } catch (error) {
      client.disconnect();
      return;
    }

    // console.log({payload})

    // console.log('Cliente conectado: ', client.id);
    // console.log({conectados : this.messagesWsService.getConnectedClients()}); // Retorna el mensaje de cuantos usuarios están conectados

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients() );
    
  
  }

  handleDisconnect(client: Socket) {
    // console.log('Cliente desconectado: ', client.id);
    this.messagesWsService.removeClient(client.id);
    // console.log({conectados : this.messagesWsService.getConnectedClients()}); // Retorna el mensaje de cuantos usuarios están conectados

    this.wss.emit('clients-updated', this.messagesWsService.getConnectedClients() );
  }


  @SubscribeMessage('message-from-client')
  onMessageFromClient(client: Socket, payload: NewMessageDto){
    

    //! EMITE UNICAMENTE AL CLIENTE.

    // client.emit('message-from-server',{
    //   fullName: 'Soy yo!!',
    //   message:payload.message || 'no-message!!'
    // });



    //! EMITIR A TODOS MENOS, AL CLIENTE INICIAL.
    // client.broadcast.emit('message-from-server',{
    //   fullName: 'Soy yo!!',
    //   message:payload.message || 'no-message!!'
    // });

    this.wss.emit('message-from-server',{
        fullName: this.messagesWsService.getUserFullName(client.id),
        message:payload.message || 'no-message!!'
      });
  
  }
}
