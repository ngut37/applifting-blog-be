import { Connection, createConnection, getConnectionManager } from 'typeorm';
import { PostgresConnectionOptions } from 'typeorm/driver/postgres/PostgresConnectionOptions';

import * as tenantsOrmConfig from '../../tenants-orm.config';

export function getTenantConnection(apiKey: string): Promise<Connection> {
  const connectionName = `tenant_${apiKey}`;
  const connectionManager = getConnectionManager();

  if (connectionManager.has(connectionName)) {
    const connection = connectionManager.get(connectionName);
    return Promise.resolve(
      connection.isConnected ? connection : connection.connect(),
    );
  }

  return createConnection({
    ...(tenantsOrmConfig as PostgresConnectionOptions),
    name: connectionName,
    schema: connectionName,
  });
}
