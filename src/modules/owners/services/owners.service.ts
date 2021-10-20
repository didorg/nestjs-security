import { Injectable } from "@nestjs/common";
import { Owner } from "src/persistence/entities/owners/owner.entity";
import { OwnerRepository } from "src/persistence/repositories/owner.repository";

import { OwnerInputDTO } from "../dto/owner.in.dto";
import { OwnerOutputDTO } from "../dto/owner.out.dto";
import { OwnersServiceMapper } from "./owners.service.mapper";

@Injectable()
export class OwnersService {
  constructor(
    private readonly ownerRepository: OwnerRepository,
    private ownerServiceMapper: OwnersServiceMapper
  ) {}

  async createOwner(ownerIn: OwnerInputDTO): Promise<OwnerOutputDTO> {
    const owner: Owner =
      await this.ownerServiceMapper.mapperOwnerInputDTOToOwner(ownerIn);
    const ownerCreated: Owner = this.ownerRepository.create(owner);
    const ownerSaved: Owner = await this.ownerRepository.save(ownerCreated);
    const ownerOut: OwnerOutputDTO =
      await this.ownerServiceMapper.mapperOwnerToOwnerOutputDTO(ownerSaved);
    return ownerOut;
  }

  async findAll(): Promise<OwnerOutputDTO[]> {
    const owners = await this.ownerRepository.find();
    const ownerOutputDTOs =
      await this.ownerServiceMapper.mapperOwnersToOwnerOutputDTOs(owners);
    return ownerOutputDTOs;
  }

  async findOne(id: number): Promise<OwnerOutputDTO> {
    const ownerById: Owner = await this.ownerRepository.findOneOrFail(id);
    const ownerOutputDTO =
      await this.ownerServiceMapper.mapperOwnerToOwnerOutputDTO(ownerById);
    return ownerOutputDTO;
  }

  // update(id: number, updateOwnerInput: OwnerOutputDTO) {
  //   return `This action updates a #${id} owner`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} owner`;
  // }
}
