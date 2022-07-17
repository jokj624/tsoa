import { Controller, Get, Route, SuccessResponse } from '@tsoa/runtime';
import { TestModel } from '../testModel';
import { NonFactoryDecorator } from '../custom/non-factory-decorator';
import { ModelService } from '../services/modelService';

@Route('Controller')
export class TestController extends Controller {
  @NonFactoryDecorator
  @Get('normalStatusCode')
  public async normalStatusCode(): Promise<TestModel> {
    return Promise.resolve(new ModelService().getModel());
  }

  @Get('noContentStatusCode')
  public async noContentStatusCode(): Promise<void> {
    return;
  }

  @Get('falseStatusCode')
  public async falseStatusCode(): Promise<boolean> {
    return false;
  }

  @Get('zeroStatusCode')
  public async zeroStatusCode(): Promise<number> {
    return 0;
  }

  @Get('customStatusCode')
  public async customNomalStatusCode(): Promise<TestModel> {
    const service = new ModelService();

    return new Promise<TestModel>(resolve => {
      setTimeout(() => {
        this.setStatus(205);
        resolve(service.getModel());
      }, 1000);
    });
  }

  @Get('unavailableForLegalReasonsStatusCode')
  public async unavailableForLegalReasonsStatusCode(): Promise<void> {
    return;
  }

  @Get('customHeader')
  public async customHeader(): Promise<void> {
    return new Promise<void>(resolve => {
      setTimeout(() => {
        this.setHeader('hero', 'IronMan');
        this.setHeader('name', 'Tony Stark');
        this.setHeader('set-cookie', ['token=MY_AUTH_TOKEN;', 'refreshToken=MY_REFRESH_TOKEN;']);
        resolve();
      }, 1000);
    });
  }

  @SuccessResponse(418)
  @Get('successResponse')
  public async getSuccessResponse(): Promise<void> {
    return;
  }
}
