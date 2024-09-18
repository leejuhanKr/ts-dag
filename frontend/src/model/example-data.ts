import { FlowSchema } from '../types';

export const calc3dpmSchemaEx: FlowSchema = {
  properties: {
    material: {
      properties: {
        concrete: {
          properties: {
            grade: {
              properties: {
                design_code: {
                  type: 'string',
                  title: 'Design Code',
                  description: 'Design code',
                  default: 'ACI318M-19',
                },
                grade: {
                  type: 'string',
                  title: 'Grade',
                  description: 'Grade of the concrete',
                  default: 'C12',
                },
              },
              type: 'object',
              title: 'GSD Concrete Grade',
              dataclassname: 'moapy.data_pre.ConcreteGrade',
              default: {
                design_code: 'ACI318M-19',
                grade: 'C12',
              },
            },
            curve_uls: {
              items: {
                properties: {
                  stress: {
                    type: 'number',
                    title: 'Stress',
                    description: 'Stress',
                    default: 0,
                  },
                  strain: {
                    type: 'number',
                    title: 'Strain',
                    description: 'Strain',
                    default: 0,
                  },
                },
                type: 'object',
                title: 'Stress Strain Component',
                dataclassname: 'moapy.data_pre.Stress_Strain_Component',
              },
              type: 'array',
              title: 'Curve Uls',
              description: 'Stress strain curve concrete ULS',
              default: [
                {
                  stress: 0,
                  strain: 0,
                },
                {
                  stress: 0,
                  strain: 0.0006,
                },
                {
                  stress: 34,
                  strain: 0.0006,
                },
                {
                  stress: 34,
                  strain: 0.003,
                },
              ],
            },
            curve_sls: {
              items: {
                properties: {
                  stress: {
                    type: 'number',
                    title: 'Stress',
                    description: 'Stress',
                    default: 0,
                  },
                  strain: {
                    type: 'number',
                    title: 'Strain',
                    description: 'Strain',
                    default: 0,
                  },
                },
                type: 'object',
                title: 'Stress Strain Component',
                dataclassname: 'moapy.data_pre.Stress_Strain_Component',
              },
              type: 'array',
              title: 'Curve Sls',
              description: 'Stress strain curve',
              default: [
                {
                  stress: 0,
                  strain: 0,
                },
                {
                  stress: 32.8,
                  strain: 0.001,
                },
              ],
            },
          },
          type: 'object',
          title: 'GSD Material Concrete',
          dataclassname: 'moapy.data_pre.MaterialConcrete',
          default: {
            grade: {
              design_code: 'ACI318M-19',
              grade: 'C12',
            },
            curve_uls: [
              {
                stress: 0,
                strain: 0,
              },
              {
                stress: 0,
                strain: 0.0006,
              },
              {
                stress: 34,
                strain: 0.0006,
              },
              {
                stress: 34,
                strain: 0.003,
              },
            ],
            curve_sls: [
              {
                stress: 0,
                strain: 0,
              },
              {
                stress: 32.8,
                strain: 0.001,
              },
            ],
          },
        },
        rebar: {
          anyOf: [
            {
              properties: {
                grade: {
                  properties: {
                    design_code: {
                      type: 'string',
                      title: 'Design Code',
                      description: 'Design code',
                      default: 'ACI318M-19',
                    },
                    grade: {
                      type: 'string',
                      title: 'Grade',
                      description: 'Grade of the rebar',
                      default: 'Grade 420',
                    },
                  },
                  type: 'object',
                  title: 'GSD Rebar Grade',
                  dataclassname: 'moapy.data_pre.RebarGrade',
                },
                curve_uls: {
                  items: {
                    properties: {
                      stress: {
                        type: 'number',
                        title: 'Stress',
                        description: 'Stress',
                        default: 0,
                      },
                      strain: {
                        type: 'number',
                        title: 'Strain',
                        description: 'Strain',
                        default: 0,
                      },
                    },
                    type: 'object',
                    title: 'Stress Strain Component',
                    dataclassname: 'moapy.data_pre.Stress_Strain_Component',
                  },
                  type: 'array',
                  title: 'Curve Uls',
                  description: 'Stress strain curve',
                  default: [
                    {
                      stress: 0,
                      strain: 0,
                    },
                    {
                      stress: 500,
                      strain: 0.0025,
                    },
                    {
                      stress: 500,
                      strain: 0.05,
                    },
                  ],
                },
                curve_sls: {
                  items: {
                    properties: {
                      stress: {
                        type: 'number',
                        title: 'Stress',
                        description: 'Stress',
                        default: 0,
                      },
                      strain: {
                        type: 'number',
                        title: 'Strain',
                        description: 'Strain',
                        default: 0,
                      },
                    },
                    type: 'object',
                    title: 'Stress Strain Component',
                    dataclassname: 'moapy.data_pre.Stress_Strain_Component',
                  },
                  type: 'array',
                  title: 'Curve Sls',
                  description: 'Stress strain curve',
                  default: [
                    {
                      stress: 0,
                      strain: 0,
                    },
                    {
                      stress: 500,
                      strain: 0.0025,
                    },
                    {
                      stress: 500,
                      strain: 0.05,
                    },
                  ],
                },
              },
              type: 'object',
              title: 'GSD Material Rebar',
              dataclassname: 'moapy.data_pre.MaterialRebar',
            },
            {
              type: 'null',
            },
          ],
          description: 'Rebar properties',
          default: {
            grade: {
              design_code: 'ACI318M-19',
              grade: 'Grade 420',
            },
            curve_uls: [
              {
                strain: 0,
                stress: 0,
              },
              {
                strain: 0.0025,
                stress: 500,
              },
              {
                strain: 0.05,
                stress: 500,
              },
            ],
            curve_sls: [
              {
                strain: 0,
                stress: 0,
              },
              {
                strain: 0.0025,
                stress: 500,
              },
              {
                strain: 0.05,
                stress: 500,
              },
            ],
          },
        },
        tendon: {
          anyOf: [
            {
              properties: {
                grade: {
                  properties: {
                    design_code: {
                      type: 'string',
                      title: 'Design Code',
                      description: 'Design code',
                      default: 'ACI318M-19',
                    },
                    grade: {
                      type: 'string',
                      title: 'Grade',
                      description: 'Grade of the tendon',
                      default: 'Grade 420',
                    },
                  },
                  type: 'object',
                  title: 'GSD Tendon Grade',
                  dataclassname: 'moapy.data_pre.TendonGrade',
                },
                curve_uls: {
                  items: {
                    properties: {
                      stress: {
                        type: 'number',
                        title: 'Stress',
                        description: 'Stress',
                        default: 0,
                      },
                      strain: {
                        type: 'number',
                        title: 'Strain',
                        description: 'Strain',
                        default: 0,
                      },
                    },
                    type: 'object',
                    title: 'Stress Strain Component',
                    dataclassname: 'moapy.data_pre.Stress_Strain_Component',
                  },
                  type: 'array',
                  title: 'Curve Uls',
                  description: 'Stress strain curve',
                  default: [
                    {
                      stress: 0,
                      strain: 0,
                    },
                    {
                      stress: 1450,
                      strain: 0.00725,
                    },
                    {
                      stress: 1750,
                      strain: 0.05,
                    },
                  ],
                },
                curve_sls: {
                  items: {
                    properties: {
                      stress: {
                        type: 'number',
                        title: 'Stress',
                        description: 'Stress',
                        default: 0,
                      },
                      strain: {
                        type: 'number',
                        title: 'Strain',
                        description: 'Strain',
                        default: 0,
                      },
                    },
                    type: 'object',
                    title: 'Stress Strain Component',
                    dataclassname: 'moapy.data_pre.Stress_Strain_Component',
                  },
                  type: 'array',
                  title: 'Curve Sls',
                  description: 'Stress strain curve',
                  default: [
                    {
                      stress: 0,
                      strain: 0,
                    },
                    {
                      stress: 1450,
                      strain: 0.00725,
                    },
                    {
                      stress: 1750,
                      strain: 0.05,
                    },
                  ],
                },
              },
              type: 'object',
              title: 'GSD Material Tendon',
              dataclassname: 'moapy.data_pre.MaterialTendon',
            },
            {
              type: 'null',
            },
          ],
          description: 'Tendon properties',
          default: {
            grade: {
              design_code: 'ACI318M-19',
              grade: 'Grade 420',
            },
            curve_uls: [
              {
                strain: 0,
                stress: 0,
              },
              {
                strain: 0.00725,
                stress: 1450,
              },
              {
                strain: 0.05,
                stress: 1750,
              },
            ],
            curve_sls: [
              {
                strain: 0,
                stress: 0,
              },
              {
                strain: 0.00725,
                stress: 1450,
              },
              {
                strain: 0.05,
                stress: 1750,
              },
            ],
          },
        },
      },
      type: 'object',
      title: 'GSD Material',
      dataclassname: 'moapy.data_pre.Material',
    },
    geometry: {
      properties: {
        concrete: {
          properties: {
            material: {
              properties: {
                design_code: {
                  type: 'string',
                  title: 'Design Code',
                  description: 'Design code',
                  default: 'ACI318M-19',
                },
                grade: {
                  type: 'string',
                  title: 'Grade',
                  description: 'Grade of the concrete',
                  default: 'C12',
                },
              },
              type: 'object',
              title: 'GSD Concrete Grade',
              dataclassname: 'moapy.data_pre.ConcreteGrade',
              default: {
                design_code: 'ACI318M-19',
                grade: 'C12',
              },
            },
            outerPolygon: {
              items: {
                properties: {
                  x: {
                    type: 'number',
                    title: 'X',
                  },
                  y: {
                    type: 'number',
                    title: 'Y',
                  },
                },
                type: 'object',
                required: ['x', 'y'],
                title: 'Point',
                dataclassname: 'moapy.data_pre.Point',
              },
              type: 'array',
              title: 'Outerpolygon',
              description: 'Outer polygon of the concrete',
              default: [
                {
                  x: 0,
                  y: 0,
                },
                {
                  x: 400,
                  y: 0,
                },
                {
                  x: 400,
                  y: 600,
                },
                {
                  x: 0,
                  y: 600,
                },
              ],
            },
            innerPolygon: {
              items: {
                properties: {
                  x: {
                    type: 'number',
                    title: 'X',
                  },
                  y: {
                    type: 'number',
                    title: 'Y',
                  },
                },
                type: 'object',
                required: ['x', 'y'],
                title: 'Point',
                dataclassname: 'moapy.data_pre.Point',
              },
              type: 'array',
              title: 'Innerpolygon',
              description: 'Inner polygon of the concrete',
              default: [
                {
                  x: 80,
                  y: 80,
                },
                {
                  x: 320,
                  y: 80,
                },
                {
                  x: 320,
                  y: 520,
                },
                {
                  x: 80,
                  y: 520,
                },
              ],
            },
          },
          type: 'object',
          title: 'GSD Concrete Geometry',
          dataclassname: 'moapy.data_pre.ConcreteGeometry',
          default: {
            material: {
              design_code: 'ACI318M-19',
              grade: 'C12',
            },
            outerPolygon: [
              {
                x: 0,
                y: 0,
              },
              {
                x: 400,
                y: 0,
              },
              {
                x: 400,
                y: 600,
              },
              {
                x: 0,
                y: 600,
              },
            ],
            innerPolygon: [
              {
                x: 80,
                y: 80,
              },
              {
                x: 320,
                y: 80,
              },
              {
                x: 320,
                y: 520,
              },
              {
                x: 80,
                y: 520,
              },
            ],
          },
        },
        rebar: {
          anyOf: [
            {
              properties: {
                prop: {
                  properties: {
                    area: {
                      type: 'number',
                      title: 'Area',
                      description: 'Area of the rebar',
                      default: 287,
                    },
                    material: {
                      properties: {
                        design_code: {
                          type: 'string',
                          title: 'Design Code',
                          description: 'Design code',
                          default: 'ACI318M-19',
                        },
                        grade: {
                          type: 'string',
                          title: 'Grade',
                          description: 'Grade of the rebar',
                          default: 'Grade 420',
                        },
                      },
                      type: 'object',
                      title: 'GSD Rebar Grade',
                      dataclassname: 'moapy.data_pre.RebarGrade',
                    },
                  },
                  type: 'object',
                  title: 'GSD Rebar Properties',
                  dataclassname: 'moapy.data_pre.RebarProp',
                },
                points: {
                  items: {
                    properties: {
                      x: {
                        type: 'number',
                        title: 'X',
                      },
                      y: {
                        type: 'number',
                        title: 'Y',
                      },
                    },
                    type: 'object',
                    required: ['x', 'y'],
                    title: 'Point',
                    dataclassname: 'moapy.data_pre.Point',
                  },
                  type: 'array',
                  title: 'Points',
                  description: 'Rebar Points',
                  default: [
                    {
                      x: 40,
                      y: 40,
                    },
                    {
                      x: 360,
                      y: 40,
                    },
                    {
                      x: 360,
                      y: 560,
                    },
                    {
                      x: 40,
                      y: 560,
                    },
                  ],
                },
              },
              type: 'object',
              title: 'GSD Rebar Geometry',
              dataclassname: 'moapy.data_pre.RebarGeometry',
            },
            {
              type: 'null',
            },
          ],
          description: 'Rebar geometry',
          default: {
            prop: {
              area: 287,
              material: {
                design_code: 'ACI318M-19',
                grade: 'Grade 420',
              },
            },
            points: [
              {
                x: 40,
                y: 40,
              },
              {
                x: 360,
                y: 40,
              },
              {
                x: 360,
                y: 560,
              },
              {
                x: 40,
                y: 560,
              },
            ],
          },
        },
        tendon: {
          anyOf: [
            {
              properties: {
                prop: {
                  properties: {
                    area: {
                      type: 'number',
                      title: 'Area',
                      description: 'Area of the tendon',
                      default: 287,
                    },
                    material: {
                      properties: {
                        design_code: {
                          type: 'string',
                          title: 'Design Code',
                          description: 'Design code',
                          default: 'ACI318M-19',
                        },
                        grade: {
                          type: 'string',
                          title: 'Grade',
                          description: 'Grade of the tendon',
                          default: 'Grade 420',
                        },
                      },
                      type: 'object',
                      title: 'GSD Tendon Grade',
                      dataclassname: 'moapy.data_pre.TendonGrade',
                    },
                    prestress: {
                      type: 'number',
                      title: 'Prestress',
                      description: 'Prestress of the tendon',
                      default: 0,
                    },
                  },
                  type: 'object',
                  title: 'GSD Tendon Properties',
                  dataclassname: 'moapy.data_pre.TendonProp',
                },
                points: {
                  items: {
                    properties: {
                      x: {
                        type: 'number',
                        title: 'X',
                      },
                      y: {
                        type: 'number',
                        title: 'Y',
                      },
                    },
                    type: 'object',
                    required: ['x', 'y'],
                    title: 'Point',
                    dataclassname: 'moapy.data_pre.Point',
                  },
                  type: 'array',
                  title: 'Points',
                  description: 'Tendon Points',
                  default: [],
                },
              },
              type: 'object',
              title: 'GSD Tendon Geometry',
              dataclassname: 'moapy.data_pre.TendonGeometry',
            },
            {
              type: 'null',
            },
          ],
          description: 'Tendon geometry',
          default: {
            prop: {
              area: 287,
              material: {
                design_code: 'ACI318M-19',
                grade: 'Grade 420',
              },
              prestress: 0,
            },
            points: [],
          },
        },
      },
      type: 'object',
      title: 'GSD Geometry',
      dataclassname: 'moapy.data_pre.Geometry',
    },
    lcb: {
      properties: {
        uls: {
          properties: {
            lcoms: {
              items: {
                properties: {
                  name: {
                    type: 'string',
                    title: 'Name',
                    description: 'load combination name',
                    default: 'lcom',
                  },
                  f: {
                    properties: {
                      Nz: {
                        type: 'number',
                        title: 'Nz',
                        description: 'Axial force',
                        default: 0,
                        unit: 'force',
                      },
                      Mx: {
                        type: 'number',
                        title: 'Mx',
                        description: 'Moment about x-axis',
                        default: 0,
                        unit: 'moment',
                      },
                      My: {
                        type: 'number',
                        title: 'My',
                        description: 'Moment about y-axis',
                        default: 0,
                        unit: 'moment',
                      },
                    },
                    type: 'object',
                    title: 'Force',
                    description: 'Force class',
                    dataclassname: 'moapy.data_pre.Force',
                  },
                },
                type: 'object',
                title: 'Lcom Result',
                dataclassname: 'moapy.data_pre.Lcom',
              },
              type: 'array',
              title: 'Lcoms',
              description: 'load combination result',
              default: [
                {
                  name: 'uls1',
                  f: {
                    Mx: 10,
                    My: 50,
                    Nz: 100,
                  },
                },
              ],
            },
          },
          type: 'object',
          title: 'Strength Result',
          dataclassname: 'moapy.data_pre.Lcoms',
          default: {
            lcoms: [
              {
                name: 'uls1',
                f: {
                  Mx: 10,
                  My: 50,
                  Nz: 100,
                },
              },
            ],
          },
        },
      },
      type: 'object',
      title: 'GSD Load Combination',
      dataclassname: 'moapy.data_pre.Lcb',
    },
    opt: {
      properties: {
        dgncode: {
          type: 'string',
          enum: ['ACI318M-19', 'Eurocode2-04'],
          title: 'Dgncode',
          description: 'Design code',
          default: 'Eurocode2-04',
        },
        by_ecc_pu: {
          type: 'string',
          enum: ['ecc', 'P-U'],
          title: 'By Ecc Pu',
          description: 'ecc or P-U',
          default: 'ecc',
        },
      },
      type: 'object',
      title: 'GSD Options',
      dataclassname: 'moapy.data_pre.PMOptions',
    },
  },
  type: 'object',
  required: ['material', 'geometry', 'lcb', 'opt'],
  title: '',
};
export const geometryDesignFnOutEx = {
  print: '',
  json: {
    'moapy.data_pre.Geometry': {
      concrete: {
        material: {
          design_code: 'ACI318M-19',
          grade: 'C12',
        },
        outerPolygon: [
          {
            x: 0,
            y: 0,
          },
          {
            x: 400,
            y: 0,
          },
          {
            x: 400,
            y: 600,
          },
          {
            x: 0,
            y: 600,
          },
        ],
        innerPolygon: [
          {
            x: 80,
            y: 80,
          },
          {
            x: 320,
            y: 80,
          },
          {
            x: 320,
            y: 520,
          },
          {
            x: 80,
            y: 520,
          },
        ],
      },
      rebar: {
        prop: {
          area: 287,
          material: {
            design_code: 'ACI318M-19',
            grade: 'Grade 420',
          },
        },
        points: [
          {
            x: 40,
            y: 40,
          },
          {
            x: 360,
            y: 40,
          },
          {
            x: 360,
            y: 560,
          },
          {
            x: 40,
            y: 560,
          },
        ],
      },
      tendon: {
        prop: {
          area: 287,
          material: {
            design_code: 'ACI318M-19',
            grade: 'Grade 420',
          },
          prestress: 0,
        },
        points: [],
      },
    },
  },
  version: '0.8.7.0',
};
