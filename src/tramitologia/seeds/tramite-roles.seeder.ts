import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RoleConfig } from '../../role-config/schemas/role-config.schema';

const TRAMITE_ROLES = [
  {
    name: 'TRAMITE_ADMIN',
    displayName: 'Administrador de Trámites',
    description: 'Crea/edita plantillas y consulta reportes.',
    isSystem: false,
    priority: 15,
    sidebarPermissions: [
      '/admin/tramitologia/plantillas',
      '/admin/tramitologia/dashboard',
      '/admin/tramitologia/reportes',
      '/admin/tramitologia/bandeja',
      '/admin/account',
    ],
  },
  {
    name: 'TRAMITE_OPERATIVO',
    displayName: 'Operativo de Trámites',
    description: 'Procesa los trámites asignados.',
    isSystem: false,
    priority: 16,
    sidebarPermissions: ['/admin/tramitologia/bandeja', '/admin/account'],
  },
  {
    name: 'TRAMITE_VERIFICADOR',
    displayName: 'Verificador de Trámites',
    description: 'Acceso de solo lectura a trámites y reportes.',
    isSystem: false,
    priority: 17,
    sidebarPermissions: [
      '/admin/tramitologia/dashboard',
      '/admin/tramitologia/reportes',
      '/admin/tramitologia/bandeja',
      '/admin/account',
    ],
  },
];

@Injectable()
export class TramiteRolesSeeder implements OnModuleInit {
  constructor(@InjectModel(RoleConfig.name) private readonly roleModel: Model<RoleConfig>) {}

  async onModuleInit() {
    for (const role of TRAMITE_ROLES) {
      await this.roleModel.updateOne(
        { name: role.name },
        { $setOnInsert: role },
        { upsert: true },
      );
    }
  }
}
