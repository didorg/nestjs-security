import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Owner } from 'src/persistence/entities/owners/owner.entity';
import { Repository } from 'typeorm';
import { OwnerInputDTO } from '../dto/owner.in.dto';
import { OwnerOutputDTO } from '../dto/owner.out.dto';


@Injectable()
export class OwnersService {

  constructor(
    @InjectRepository(Owner)
    private ownerRepository: Repository<Owner>){}

    async createOwner(ownerIn: OwnerInputDTO): Promise<OwnerOutputDTO> {
      const owner: Owner = await this.mapperOwnerInputDTOToOwner(ownerIn);
      const ownerCreated: Owner = this.ownerRepository.create(owner);
      const ownerSaved: Owner = await this.ownerRepository.save(ownerCreated);
      const ownerOut: OwnerOutputDTO = await this.mapperOwnerToOwnerOutputDTO(ownerSaved);
      return ownerOut;
    }
  
    async findAll(): Promise<OwnerOutputDTO[]> {
      const owners = await this.ownerRepository.find();
      const ownerOutputDTOs = await this.mapperOwnersToOwnerOutputDTOs(owners);
      return ownerOutputDTOs;
    }
  
    async findOne(id: number): Promise<OwnerOutputDTO> {
      const ownerById: Owner = await this.ownerRepository.findOneOrFail(id);
      const ownerOutputDTO = await this.mapperOwnerToOwnerOutputDTO(ownerById);
      return ownerOutputDTO;
    }
  
    //Mappers
    // TODO: (To achieve single responsibility) Move these Mappers to a Class OwnerServiceMapper and Inject it here.
    private async mapperOwnerInputDTOToOwner(ownerInputDTO: OwnerInputDTO): Promise<Owner> {
      try {
        const owner = new Owner();
        owner.id = ownerInputDTO.id;
        owner.name = ownerInputDTO.name;
        owner.pets = ownerInputDTO.pets;
        return owner;
      } catch (e) {
        throw e;
      }
    }

    private async mapperOwnersToOwnerOutputDTOs(
      owners: Owner[],
    ): Promise<OwnerOutputDTO[]> {
      let ownersOut: OwnerOutputDTO[] = [];
  
      for (let owner of owners) {
        let ownerOut = await this.mapperOwnerToOwnerOutputDTO(owner);
        ownersOut.push(ownerOut);
      }
  
      return ownersOut;
    }
  
    private async mapperOwnerToOwnerOutputDTO(owner: Owner): Promise<OwnerOutputDTO> {
      try {
        const ownerOut = new OwnerOutputDTO();
        ownerOut.id = owner.id;
        ownerOut.name = owner.name;
        ownerOut.pets = owner.pets;

        return ownerOut;
      } catch (e) {
        throw e;
      }
    }

  // update(id: number, updateOwnerInput: OwnerOutputDTO) {
  //   return `This action updates a #${id} owner`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} owner`;
  // }
}
