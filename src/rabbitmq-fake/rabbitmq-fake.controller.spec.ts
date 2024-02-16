import { Test, TestingModule } from '@nestjs/testing';
import { RabbitmqFakeController } from './rabbitmq-fake.controller';
import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';

describe('RabbitmqFakeController', () => {
  let controller: RabbitmqFakeController;
  let amqpConnectionMock: AmqpConnection;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RabbitmqFakeController],
      providers: [
        {
          provide: AmqpConnection,
          useValue: {
            publish: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<RabbitmqFakeController>(RabbitmqFakeController);
    amqpConnectionMock = module.get<AmqpConnection>(AmqpConnection);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should publish message', async () => {
    await controller.publishMessage();
    expect(amqpConnectionMock.publish).toHaveBeenCalledWith(
      'amq.direct',
      'fake-key',
      { message: 'Hello World' },
    );
  });
});
